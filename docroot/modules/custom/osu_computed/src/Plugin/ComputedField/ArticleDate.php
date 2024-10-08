<?php

namespace Drupal\osu_computed\Plugin\ComputedField;

use Drupal\computed_field\Field\ComputedFieldDefinitionWithValuePluginInterface;
use Drupal\computed_field\Plugin\ComputedField\ComputedFieldBase;
use Drupal\computed_field\Plugin\ComputedField\SingleValueTrait;
use Drupal\Core\Entity\EntityInterface;

/**
 * Computed field which outputs a formatted Created On Date.
 *
 * @ComputedField(
 *   id = "article_date",
 *   label = @Translation("Article Date"),
 *   field_type = "string",
 * )
 */
class ArticleDate extends ComputedFieldBase {

  use SingleValueTrait;

  /**
   * {@inheritdoc}
   */
  public function singleComputeValue(EntityInterface $host_entity, ComputedFieldDefinitionWithValuePluginInterface $computed_field_definition): mixed {
    if ($host_entity->isNew()) {
      return NULL;
    }

    $timestamp = $host_entity->getCreatedTime();
    $date = \Drupal::service('date.formatter')->format($timestamp, 'article_format');

    return $date;
  }

}
