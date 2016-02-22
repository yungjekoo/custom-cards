var React = require('react');
var RPT = React.PropTypes;
var Image = require('./Image.jsx');

var styles = {
    formElement:{
        marginBottom:"15px",
        boxSizing:"border-box"
    },
    previewContainer:{
        border: "1px solid lightgray",
        width:"300px",
        height:"200px",
        float:"left"
    },
    previewImage:{
        maxWidth:"100%",
        maxHeight:"100%"
    },
    imageError:{
        height: "100%",
        width:"100%",
        display: "table"
    },
    imageErrorText:{
        display:"table-cell",
        verticalAlign:"middle",
        textAlign:"center"
    },
    after:{
        clear:"both"
    }

};

var ImagePreview = React.createClass({

  propTypes: {
    onChange: RPT.func,
    initialValue: RPT.string,
    style: RPT.object,
        type:RPT.string
  },

  getInitialState: function() {
    return {
      url: this.props.url,
          hasError: false
    };
  },


    componentWillReceiveProps:function(props){
        this.setState({url:props.url});
         this.setState({hasError:false});
    },

    handleError:function(e){
        var self = this;
        self.setState({hasError:true});
    },

  render: function() {
        var errorMsg = <div style={styles.imageError}><span style={styles.imageErrorText}>No preview available</span></div>;

        var image = this.state.hasError?errorMsg:<Image url={this.state.url} onError={this.handleError} style={styles.previewImage}></Image>;

    return (
      <div style={styles.formElement}>
                <div style={styles.previewContainer}>
                {image}
                    </div>
                <div style={styles.after}></div>
      </div>
    );
  }
});

module.exports = ImagePreview;
