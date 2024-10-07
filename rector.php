<?php

/**
 * @file
 * Rector configuration.
 */

declare(strict_types=1);

use DrupalFinder\DrupalFinderComposerRuntime;
use DrupalRector\Set\Drupal10SetList;
use DrupalRector\Set\Drupal9SetList;
use Rector\Config\RectorConfig;
use Rector\Symfony\Set\SymfonySetList;
use Rector\Symfony\Set\TwigSetList;

return static function (RectorConfig $rectorConfig): void {
  // Adjust the set lists to be more granular to your Drupal requirements.
  // @todo find out how to only load the relevant rector rules.
  //   Should we try and load \Drupal::VERSION and check?
  $rectorConfig->sets([
    Drupal9SetList::DRUPAL_93,
    Drupal9SetList::DRUPAL_94,
    SymfonySetList::SYMFONY_50,
    SymfonySetList::SYMFONY_60,
    SymfonySetList::SYMFONY_61,
    SymfonySetList::SYMFONY_62,
    SymfonySetList::SYMFONY_63,
    Drupal10SetList::DRUPAL_102,
    TwigSetList::TWIG_140,
    TwigSetList::TWIG_20,
    TwigSetList::TWIG_240,
  ]);

  $drupalFinder = new DrupalFinderComposerRuntime();
  $drupalRoot = $drupalFinder->getDrupalRoot();
  $rectorConfig->autoloadPaths([
      $drupalRoot . '/core',
      $drupalRoot . '/modules',
      $drupalRoot . '/profiles',
      $drupalRoot . '/themes',
  ]);

  $rectorConfig->skip([
    '*/upgrade_status/tests/modules/*',
    'node_modules/*',
    // There is an issue with the PHPStan\PhpDocParser\Ast\PhpDoc\PhpDocNode::getParamImmediatelyInvokedCallableTagValues()
    // method that is causing a fatal error when running Drupal rector.
    '*/docroot/themes/custom/osu/*.theme',
    '*/docroot/modules/custom/osu_layout_builder_ux/osu_layout_builder_ux.module',
    '*/docroot/modules/custom/osu_admin/osu_admin.module',
  ]);
  $rectorConfig->fileExtensions(['php', 'module', 'theme', 'install', 'profile', 'inc', 'engine']);
  $rectorConfig->importNames(true, false);
  $rectorConfig->importShortClasses(false);
};
