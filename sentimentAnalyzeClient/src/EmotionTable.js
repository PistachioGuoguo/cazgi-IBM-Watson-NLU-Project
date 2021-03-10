import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {

   
    render() {

      const emotions = this.props.emotions;

      let emotionArray = [];
      for (let key in emotions){
        emotionArray.push([key, emotions[key]]);  // convert json to array in order to perform "map" operation
      }

      return (  
          <div>
              <table className="table table-bordered">
                <tbody>
                  {emotionArray.map( item => (
                      <tr>
                      <td>{item[0]}</td>
                      <td>{item[1]}</td>
                      </tr>
                  ))}
                </tbody>
              </table>
          </div>
        );
  
    }

    
}
export default EmotionTable;
