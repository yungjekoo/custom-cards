var React = require('react');
var Table = require('../../common/components/Table.jsx');
var TableDetailBtn = require('../../common/components/TableDetailBtn.jsx');
var TableImage = require('../../common/components/TableImage.jsx');
var UserStore = require('../../experimental/stores/UserStore');
var Actions = require('../dashboard/Actions.jsx');

var RPT = React.PropTypes;

var styles = {
};

var TableUser = React.createClass({
  propTypes: {
        nls: RPT.object,
        metaData: RPT.array,
    fakeData: RPT.array
  },

  getInitialState:function(){
    return{
      responsiveResultsPerPage:this.props.responsiveResultsPerPage?this.props.responsiveResultsPerPage:3,
      height:this.props.height?this.props.height:200,
      columns:this.props.columns?this.props.columns:["name", "mail", "avatar", "action"],
      data:this.props.fakeData                                                      // initial fakeDate with "loading" attributes
    }                 ;                                                                 // needed to fix bug: non displayed data before resize table
  },


  componentDidMount:function(){
    UserStore.listen(this.onUpdate);
    UserStore.Actions.connect();
  },

  componentWillReceiveProps:function(nextProps){
    if(this.props.wrapper.height !== nextProps.wrapper.height){
      var heightOfTable = nextProps.style.height.substring(0,nextProps.style.height.length-2);
      var heightOfTableNum = Number(heightOfTable);
      this.state.responsiveResultsPerPage=(heightOfTableNum-130)/70;
    }
  },


  onUpdate:function(payload){
    if(payload.users){this.setState({data:payload.users});}
  },


  render: function() {
    var fakeData = this.props.fakeData || [];
      var metaData = this.props.metaData || [];
      metaData[0].customComponent = TableDetailBtn;
      metaData[1].customComponent = TableImage;
      var wrapper = this.props.wrapper;


    return (
      <div style={styles}>
          <Table

              resultsPerPage={this.state.responsiveResultsPerPage}

              settingsText={""}
              enableInfiniteScroll={false}
              bodyHeight={this.state.height}
              results={this.state.data}
              columnMetadata={metaData}
              showFilter={true}
              showSettings={true}
              maxRowsText= {""}
              isSubGriddle={false}
              useFixedLayout={true}
              columns={this.state.columns}
          />
      </div>
      );
  }
});

module.exports = TableUser;



