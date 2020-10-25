import { withPluginApi } from 'discourse/lib/plugin-api';
import { scheduleOnce } from "@ember/runloop";
import { on } from "discourse-common/utils/decorators";

export default {
  name: 'extended-custom-field-description',
  initialize() {
    withPluginApi('0.11.0', api => {
      api.modifyClass('component:create-account', {
        @on('didInsertElement')       
        applyExtendedDescription() {
          scheduleOnce('afterRender', () => {
            const parts = settings.custom_field_description.split(/,(.+)/);
            const $element = $(this.element);
            $element.find(`.user-field-${parts[0]} .instructions`).text(parts[1]);
          });
        }
      });
    });
  }
}