import React from "react";
import "./example.scss";
import { user_mock } from "../../test/api";
import { ListBasic } from "mc-ui-react";

const Example = () => {
  const data = user_mock.data;
  const listBasicToggleData = data.concat();
  const listBasicTagsData = data.concat();
  return (
    <div className="mc-example">
      <div className="example--header">
        <h4>Component Examples</h4>
      </div>
      <div className="example--item">
        <div className="example--item--header">
          <h6>Basic List - Horizontal Toggle</h6>
        </div>
        <div className="example--item--body">
        <ListBasic data={listBasicToggleData} selectedItems={[listBasicToggleData[0]]} horizontal={true} />
        <ListBasic data={listBasicTagsData} horizontal={true} />
        </div>
      </div>
    </div>
  );
};

export default Example;
