<?php

namespace Drupal\osu_computed\Plugin\ComputedField;

use Drupal\computed_field\Field\ComputedFieldDefinitionWithValuePluginInterface;
use Drupal\computed_field\Plugin\ComputedField\ComputedFieldBase;
use Drupal\computed_field\Plugin\ComputedField\SingleValueTrait;
use Drupal\Core\Entity\EntityInterface;

/**
 * Computed field which outputs a concatenated full name.
 *
 * @ComputedField(
 *   id = "full_name",
 *   label = @Translation("Full Name"),
 *   field_type = "string",
 * )
 */
class FullName extends ComputedFieldBase {

  use SingleValueTrait;

  /**
   * {@inheritdoc}
   */
  public function singleComputeValue(EntityInterface $host_entity, ComputedFieldDefinitionWithValuePluginInterface $computed_field_definition): mixed {
    if ($host_entity->isNew()) {
      return NULL;
    }

    $first_name = $host_entity->get('field_faculty_first_name')->value;
    $last_name = $host_entity->get('field_faculty_last_name')->value;
    $full_name = $first_name . ' ' . $last_name;

    return $full_name;
  }

}
