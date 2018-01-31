<?php

namespace wrp\includes;

interface PluginSettingsInterface {
    public function renderInputText(array $args) : string;
    public function renderInputCheckbox(array $args) : string;
}

?>