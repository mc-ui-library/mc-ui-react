import React from "react";
import "./button.scss";
import { MCUIService } from "../../mc-ui.service";

interface MaskProps {
  theme?: string | string[];
  visible: boolean;
  transparent: boolean;
}

export default class Mask extends React.Component<MaskProps> {
  private service: MCUIService;
  constructor(props: MaskProps) {
    super(props);
  }

  render() {
    const props = this.props;
    const classNames = [];
    if (props.visible) {
      classNames.push('visible');
    }
    if (props.transparent) {
      classNames.push('transparent');
    }
    return <div className={this.service.util.dom.getClassName('mask', props.theme, classNames)}></div>;
  }
}
