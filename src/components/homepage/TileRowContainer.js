import React from 'react';
import Tile from './Tile'
import QueryString from 'query-string';
import './TileRowContainer.css';

class TileRowContainer extends React.Component {
  render() {
  	let tiles = []
  	for (let i = 0; i < this.props.displaydata.length; i++){
  	  tiles.push(
        <li>
          <Tile key={i} num={i} contents={this.props.displaydata[i]} isGrid={false} 
            queryRedirect={"/browse?" + QueryString.stringify(this.props.querydata[i])} />
        </li>
      );
  	}

    return (
      <ul className="TileRowContainer">
        {tiles}
      </ul>
    );
  }
}

export default TileRowContainer;
