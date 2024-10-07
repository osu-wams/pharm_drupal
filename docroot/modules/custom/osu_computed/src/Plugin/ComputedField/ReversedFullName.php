<?php

namespace Drupal\osu_computed\Plugin\ComputedField;

use Drupal\computed_field\Field\ComputedFieldDefinitionWithValuePluginInterface;
use Drupal\computed_field\Plugin\ComputedField\ComputedFieldBase;
use Drupal\computed_field\Plugin\ComputedField\SingleValueTrait;
use Drupal\Core\Entity\EntityInterface;

/**
 * Computed field which outputs a concatenated reversed full name.
 *
 * @ComputedField(
 *   id = "reversed_full_name",
 *   label = @Translation("Reversed Full Name"),
 *   field_type = "string",
 * )
 */
class ReversedFullName extends ComputedFieldBase {

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
    $full_name = $last_name . ', ' . $first_name;

    return $full_name;
  }

}
