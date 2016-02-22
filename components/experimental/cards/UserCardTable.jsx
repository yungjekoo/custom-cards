var React = require('react');
var ReactDOM = require('react-dom');
var Table = require('../../common/components/Table.jsx');
var TableDetailBtn = require('../../common/components/TableDetailBtn.jsx');
var TableImage = require('../../common/components/TableImage.jsx');
var Icon = require('../../common/components/IconLink.jsx');
var UserStore = require('../../experimental/stores/UserStore');
var Actions = require('../dashboard/Actions.jsx');

var RPT = React.PropTypes;

var styles = {
    container: {
      float: "left",
      width: "100%",
      height: "100%",
      color: "black"
    },

    vCard: {
      cursor: "pointer",
      float: "left",
      paddingLeft: "10px",
      paddingRight: "10px",
      paddingBottom: "10px",
      paddingTop: "10px",
      marginLeft: "15px",
      minHeight: "100px",
      width: "185px",                                       // should be adaptive
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      marginBottom: "1rem",
      color: "black"
    },

    name: {
      fontSize: "medium",
      textTransform: "uppercase",
      color: "#323232"
    },

    avatar: {
      borderRadius: "50%",
      float: "left",
      marginRight: "10px",
      marginBottom: "10px"
    },

    infos: {
      float: "left",
      paddingTop: "5px",
      width:"100%",
      borderTop: "1px solid #000000"
    }
  };


var TableCustomView = React.createClass({

  getDefaultProps: function(){
    return {
      "data": {}
    };
  },

  clickDetailsBtn: function (event) {
  var data = Object.assign({}, this.props.data);
  Actions.notify({user: data});
  },

  componentDidMount:function(){
  },

  render: function(){

    return (
      <div style={styles.vCard} onClick={this.clickDetailsBtn}>
      <div> <span><img style={styles.avatar} src={this.props.data.avatar} width="40" height="40" alt="Avatar"/></span>
          <span style={styles.name}>{this.props.data.name}</span>
          </div>
          <div style={styles.infos}>
          <div>{this.props.data.mail}</div>
          <div><small>{this.props.data.descrip}</small></div>
          </div>
      </div>);
    }
  });


var UserCardTable = React.createClass({
  propTypes: {
    nls: RPT.object,
    metaData: RPT.array,
  fakeData: RPT.array
  },

  getInitialState:function(){
    return{
      responsiveResultsPerPage:this.props.responsiveResultsPerPage?this.props.responsiveResultsPerPage:4,
      height:this.props?this.props.height:200,
      width: this.props?this.props.width:200,
      data:this.props.fakeData
    };
  },

  componentDidMount:function(){
    var parent = ReactDOM.findDOMNode(this).parentNode;
    this.setState({didMount:true});
    UserStore.listen(this.onUpdate);
    UserStore.Actions.connect();
  },

  componentDidUpdate:function(props,state){
    if(this.state.width!==ReactDOM.findDOMNode(this).parentNode.offsetWidth){
      this.setState({width :ReactDOM.findDOMNode(this).parentNode.offsetWidth});
    }
  },

  componentWillReceiveProps:function(nextProps){
    var parent = ReactDOM.findDOMNode(this).parentNode;

    if(this.props.wrapper.height !== nextProps.wrapper.height || this.props.wrapper.width !== nextProps.wrapper.width){
var heightOfTable = nextProps.style.height.substring(0,nextProps.style.height.length-2);
      this.state.heightOfTable = Number(heightOfTable);
      this.state.responsiveResultsPerPage = Math.floor(((heightOfTable-70)/136))*Math.floor((parent.clientWidth/230));
    }
  },

  onUpdate:function(payload){
    if(payload.users){this.setState({data:payload.users});}
  },


  render: function() {
    var metaData = this.props.metaData || [];
    var wrapper = this.props.wrapper;

  return (
      <div style={styles.container}>
        <Table
          resultsPerPage={this.state.responsiveResultsPerPage}
          bodyHeight={this.state.height}
          settingsText={""}
          noDataMessage={""}
          enableInfiniteScroll={false}
          results={this.state.data}
          columnMetadata={metaData}
          showFilter={true}
          showSettings={false}
          useCustomRowComponent={true}
          customRowComponent={TableCustomView}
          enableToggleCustom={true}
          customRowComponentClassName={"vCardsWrapper"}
        />
      </div>
    );
  }
});

module.exports = UserCardTable;



