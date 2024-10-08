<?php

namespace Drupal\osu_computed\Plugin\ComputedField;

use Drupal\computed_field\Field\ComputedFieldDefinitionWithValuePluginInterface;
use Drupal\computed_field\Plugin\ComputedField\ComputedFieldBase;
use Drupal\computed_field\Plugin\ComputedField\SingleValueTrait;
use Drupal\Core\Entity\EntityInterface;

/**
 * Computed field which outputs a Node URL link.
 *
 * @ComputedField(
 *   id = "node_url",
 *   label = @Translation("Node URL"),
 *   field_type = "string",
 * )
 */
class NodeUrl extends ComputedFieldBase {

  use SingleValueTrait;

  /**
   * {@inheritdoc}
   */
  public function singleComputeValue(EntityInterface $host_entity, ComputedFieldDefinitionWithValuePluginInterface $computed_field_definition): mixed {
    if ($host_entity->isNew()) {
      return NULL;
    }

    $link = $host_entity->toUrl()->toString();

    return $link;
  }

}
