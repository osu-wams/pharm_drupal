<?php

namespace Drupal\osu_search_enhanced\Routing;

use Drupal\Core\Routing\RouteSubscriberBase;
use Symfony\Component\Routing\RouteCollection;

/**
 * Listens to the dynamic route event and overrides the search controller.
 *
 * Override the page controller's view method to our own to customize
 * the page layout better.
 */
class RouteSubscriber extends RouteSubscriberBase {

  /**
   * {@inheritdoc}
   */
  protected function alterRoutes(RouteCollection $collection) {
    // Override the controller to our own.
    if ($route = $collection->get('search.view_node_search')) {
      $route->setDefault('_controller', 'Drupal\osu_search_enhanced\Controller\OSUNodeSearchController::view');
    }
  }

}
