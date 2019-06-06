import React, { Component } from "react";
class snake extends Component {
  state = {};

  render() {
    return (
      <div>
        {this.props.snakeParts.map((d, i) => {
          const style = {
            left: `${d[0]}%`,
            top: `${d[1]}%`
          };
          return <div className="snake" key={i} style={style} />;
        })}
      </div>
    );
  }
}

export default snake;
