<?php

namespace Drupal\osu_search_enhanced\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Render\RendererInterface;
use Drupal\search\Controller\SearchController;
use Drupal\search\SearchPageInterface;
use Drupal\search\SearchPageRepositoryInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;

/**
 * Route controller for search.
 */
class OSUNodeSearchController extends ControllerBase {

  /**
   * The search page repository.
   *
   * @var \Drupal\search\SearchPageRepositoryInterface
   */
  protected $searchPageRepository;

  /**
   * A logger instance.
   *
   * @var \Psr\Log\LoggerInterface
   */
  protected $logger;

  /**
   * The renderer.
   *
   * @var \Drupal\Core\Render\RendererInterface
   */
  protected $renderer;

  /**
   * The original search controller.
   *
   * @var \Drupal\search\Controller\SearchController
   */
  protected $originalController;

  /**
   * Constructs a new search controller.
   *
   * @param \Drupal\search\SearchPageRepositoryInterface $search_page_repository
   *   The search page repository.
   * @param \Drupal\Core\Render\RendererInterface $renderer
   *   The renderer.
   * @param \Drupal\search\Controller\SearchController $search_controller
   *   The original search controller.
   */
  public function __construct(SearchPageRepositoryInterface $search_page_repository, RendererInterface $renderer, SearchController $search_controller) {
    $this->searchPageRepository = $search_page_repository;
    $this->logger = $this->getLogger('search');
    $this->renderer = $renderer;
    $this->originalController = $search_controller;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('search.search_page_repository'),
      $container->get('renderer'),
      SearchController::create($container),
    );
  }

  /**
   * Creates the render array using the original controller and the mods it.
   *
   * This controller utilizes the original controller to build the initial
   * render array and then we can modify it how we need. This helps
   * preserve all existing functionality without reinventing the wheel.
   *
   * @param \Symfony\Component\HttpFoundation\Request $request
   *   The request object.
   * @param \Drupal\search\SearchPageInterface $entity
   *   The search page entity.
   *
   * @return array
   *   The search form and search results build array.
   */
  public function view(Request $request, SearchPageInterface $entity) {
    $render_array = $this->originalController->view($request, $entity);

    // Now let's display how many results we found.
    $result_count = count($render_array['search_results']['#items']);

    // Now let's move the form and the results into a single container and apply
    // some flex layout to it.
    $render_array['content'] = [
      '#type' => 'container',
      '#attributes' => [
        'class' => [
          'osu-search-enhanced',
          'flex-container',
          'flex-dir-column',
        ],
      ],
      'content' => [
        '#type' => 'container',
        '#attributes' => [
          'class' => [
            'flex-container',
            'flex-dir-column',
            'lg-flex-dir-row',
            'flex-ai-stretch',
            'flex-jc-center',
          ],
        ],
        'search_form' => [
          '#type' => 'container',
          '#attributes' => [
            'class' => [
              'osu-search-enhanced__search-form',
              'flex-1-1',
              'lg-flex-2-7',
            ],
          ],
          'search_form' => $render_array['search_form'],
        ],
        'search_results' => [
          '#type' => 'container',
          '#attributes' => [
            'class' => [
              'osu-search-enhanced__search-results',
              'flex-1-1',
              'lg-flex-5-7',
            ],
          ],
          'content' => [
            '#type' => 'container',
            '#attributes' => [
              'class' => [
                'flex-container',
                'flex-dir-column',
              ],
            ],
            'count' => [
              '#markup' => '<div class="osu-search-enhanced__title__count flex-as-flex-end">' . $this->t('Showing <b>@count</b> results', ['@count' => $result_count]) . '</div>',
            ],
            'search_results' => $render_array['search_results'],
            'pager' => $render_array['pager'],
          ],
        ],
      ],
    ];

    // Now remove them from their original spots.
    unset($render_array['search_form']);
    unset($render_array['search_results']);
    unset($render_array['pager']);

    // Also don't need the extra page title.
    unset($render_array['search_results_title']);

    return $render_array;
  }

}
