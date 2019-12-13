import React from "react";
import "./button.scss";
import { MCUIService } from "../../mc-ui.service";

interface ButtonProps {
  theme?: string | string[];
  children: any;
  type: "button" | "submit" | "reset";
  onClick: Function;
}

export default class Button extends React.Component<ButtonProps> {
  private service: MCUIService;
  constructor(props: ButtonProps) {
    super(props);
    this.service = new MCUIService();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    this.props.onClick(e);
  }

  render() {
    return (
      <button type={this.props.type || 'button'} className={this.service.util.dom.getClassName('button', this.props.theme)} onClick={this.handleClick}>
        {this.props.children}
      </button>
    );
  }
}
