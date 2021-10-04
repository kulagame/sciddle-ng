import {Injectable} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

/**
 * Represents icon topic subdirectory
 */
enum IconTopic {
  ACTION = 'action',
  ALERT = 'alert',
  AV = 'av',
  CONTENT = 'content',
  COMMUNICATION = 'communication',
  DEVICE = 'device',
  EDITOR = 'editor',
  FILE = 'file',
  HARDWARE = 'hardware',
  IMAGE = 'image',
  MAPS = 'maps',
  NAVIGATION = 'navigation',
  SOCIAL = 'social',
}

/**
 * Represents a material design icon
 */
class Icon {
  /** Topic */
  public topic: IconTopic;
  /** Name */
  public name: string;
  /** File */
  public file: string;

  /**
   * Constructor
   * @param topic topic
   * @param name icon name
   * @param file icon file name
   */
  constructor(topic: IconTopic, name: string, file: string) {
    this.topic = topic;
    this.name = name;
    this.file = file;
  }
}

/**
 * Handles Material icons
 */
@Injectable({
  providedIn: 'root',
})
export class MaterialIconService {

  /** Root directory of material design icons */
  private ICON_ROOT_DIR = 'assets/material-design-icons';
  /** Icon variant */
  private VARIANT = 'production';
  /** List of icons */
  private icons: Icon[] = [
    {topic: IconTopic.ACTION, name: 'add', file: 'ic_add_24px.svg'},
    {topic: IconTopic.ACTION, name: 'alarm_off', file: 'ic_alarm_off_24px.svg'},
    {topic: IconTopic.ACTION, name: 'alarm_on', file: 'ic_alarm_on_24px.svg'},
    {topic: IconTopic.ACTION, name: 'help_outline', file: 'ic_help_outline_24px.svg'},
    {topic: IconTopic.ACTION, name: 'settings', file: 'ic_settings_24px.svg'},
    {topic: IconTopic.AV, name: 'shuffle', file: 'ic_shuffle_24px.svg'},
    {topic: IconTopic.AV, name: 'sort_by_alpha', file: 'ic_sort_by_alpha_24px.svg'},
    {topic: IconTopic.EDITOR, name: 'format_align_left', file: 'ic_format_align_left_24px.svg'},
    {topic: IconTopic.NAVIGATION, name: 'arrow_back', file: 'ic_arrow_back_24px.svg'},
    {topic: IconTopic.NAVIGATION, name: 'menu', file: 'ic_menu_24px.svg'},
    {topic: IconTopic.NAVIGATION, name: 'more_vert', file: 'ic_more_vert_24px.svg'},
  ];

  /**
   * Initializes icons
   *
   * @param iconRegistry icon registry
   * @param sanitizer sanitizer
   */
  public initializeIcons(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer): void {

    this.icons.forEach((icon) => {
      iconRegistry.addSvgIcon(icon.name,
        sanitizer.bypassSecurityTrustResourceUrl('./' + this.ICON_ROOT_DIR + '/' + icon.topic + '/svg/' + this.VARIANT + '/' + icon.file));
    });

    iconRegistry.addSvgIcon('blank', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/ic_blank_24px.svg'));
    iconRegistry.addSvgIcon('bell_outline', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/ic_bell_outline_24px.svg'));
    iconRegistry.addSvgIcon('bell_outline_off', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/ic_bell_outline_off_24px.svg'));
    iconRegistry.addSvgIcon('open_source_initiative',
      sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/ic_open_source_initiative_24px.svg'));
  }
}
