var React = require('react');
var c3 = require('c3');
var RPT = React.PropTypes;
var Icon = require('./Icon.jsx');
var Utils = require('../../Dashboard/dashboard/DashboardUtils');


var styles = {
    container:{
      position: "relative",
      overflow: "hidden",
      fontSize: "14px"
    },
    table: {
      width: "100%"
    },
    headerRow: {
    	borderBottom: "3px solid grey"
    },
    headerCell: {
      textAlign: "left",
      padding: "11px 7px 11px 0px"
    },
    row: {
    	fontWeight: "300"
    },
    cell: {
      padding: "11px 7px 11px 0px"
    }
};

var CardTable = React.createClass({
  propTypes: {
        style:RPT.object,
        theme:RPT.object.isRequired,
        data: RPT.array,
        header: RPT.array,
        width: RPT.number,
        height: RPT.number
  },

  getDefaultProps: function() {
    return {
            header: [],
            data: []
    };
  },


  render: function() {
        var style = Object.assign({}, styles.container, this.props.style?this.props.style:{}, {width: this.props.width + 'px'});

        styles.headerRow.borderColor = this.props.theme.light;
        styles.cell.color = this.props.theme.minor;

        var data = this.props.data;
        var header = this.props.header;

        var self = this;

        var count = 0;

        return (
          <div style={style}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.headerRow}>
                  {header.map(function(item) {
                    return <th key={count++} style={styles.headerCell}>
                            {item}
                          </th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {data.map(function(row) {
                  return <tr key={count++} style={styles.row}>
                          {row.map(function(cell) {
                            return <td key={count++} style={styles.cell}>
                                    {cell}
                                  </td>;
                          })}
                        </tr>;
                })}
              </tbody>
            </table>
          </div>
        );
  }
});

module.exports = CardTable;
