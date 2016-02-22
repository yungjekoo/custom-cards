var React = require('react');
var RPT = React.PropTypes;
var Reflux = require('reflux');

var InputField = require('../../common/components/InputField.jsx');
var Actions = require('../../Dashboard/dashboard/Actions.jsx');
var InputField = require('../../common/components/InputField.jsx');
var Section = require('../../common/components/Section.jsx');
var Label = require('../../common/components/Label.jsx');
var Image = require('../../common/components/Image.jsx');
var Button = require('../../common/components/Button.jsx');
var $ = require('jquery');


var styles = {
    sectionText: {
        marginBottom: "40px"
    },
    
    loginImgLinks: {
        cursor: "pointer",
        margin: "10px 20px 20px 0px",
        float: "left"
    },
    
    idassContainer: {
        marginRight: "5%",
        marginLeft: "5%",
        minWidth: "200px",
        width: "40%",
        float: "left"
    },
    
    providerContainer: {
        marginRight: "5%",
        marginLeft: "5%",
        minWidth: "200px",
        width: "40%",
        float: "left"      
    },
    
    orgIdContainer: {
        minWidth: "200px",
        width: "40%",
        float: "left" 
    },
    
    redirectLinkContainer: {
        width: "100%",
        textAlign: "center",
        marginTop: "40px"
    }
};


var SSOLogin = React.createClass({
    

    propTypes: {
        theme: RPT.object.isRequired,
        nls: RPT.object,
        style: RPT.object,
        url: RPT.string,
        scaleToFill:RPT.string
    },

    getInitialState: function() {
        return {
            value: "",
            visibleRedirectLink: false,
            visibleOrgIdInput: false,
            visibleChooseProv: false,
            visibleIBMLink: false,
            visibleGoogleLink: false,
            visibleFacebookLink: false,
            visibleLinkedInLink: false,
            urlIBM: "",
            urlGoogle: "",
            urlFacebook: "",
            urlLinkedIn: "",
            organizationId: ""
        }
    },
    
    getURL: function(){
        var self=this;
        var url = window.location.href;
        var start = url.indexOf("//");
        var end = url.indexOf(".");
        var org = url.substring(start+2, end); 
        this.setState({
             organizationId: org
        },function(){self.apiRequestOne();});      
    },
    
    apiRequestOne: function(){
        var self=this;
        var requestURL = window.location.origin+"/api/v0002/authentication/providers";
        var request = $.get(requestURL)
          .done(function(response) {
            console.log( "success" + response.toString() );
            self.checkRequest(response);  
            if (self.state.visibleIBMLink || self.state.visibleFacebookLink || self.state.visibleLinkedInLink || self.state.visibleGooleLink) {
                self.setState({
                    visibleOrgIdInput: false,
                    visibleChooseProv: true
                });        
            }   else {
                    self.setState({
                         visibleOrgIdInput: true,
                         organizationId: ""
                });    
            } 
          })

          .fail(function() {
            console.log( "error" );
            self.setState({
                 visibleOrgIdInput: true
            });    
          });
    },
    
    
    apiRequestTwo: function(){
        var self=this;
        var orgID=this.state.organizationId;
        var requestURL = "https://"+orgID+"."+window.location.host+"/api/v0002/authentication/providers";
        var request = $.get(requestURL)
          .done(function(response) {
            console.log( "success" + response.toString() );
            self.checkRequest(response);
            if (self.state.visibleIBMLink || self.state.visibleFacebookLink || self.state.visibleLinkedInLink || self.state.visibleGooleLink) {
                self.setState({
                    visibleOrgIdInput: false,
                    visibleChooseProv: true
                });
            }   else {
                    self.setState({
                         visibleRedirectLink: true,
                         visibleOrgIdInput: false,
                         visibleChooseProv: false
                });   
                window.location.replace("https://internetofthings.ibmcloud.com/login");
            } 
          })

          .fail(function() {
            console.log( "error" );
            self.setState({
                 visibleRedirectLink: true,
                 visibleOrgIdInput: false,
                 visibleChooseProv: false
            }); 
            window.location.replace("https://internetofthings.ibmcloud.com/login");
          });
    },
                
    
    checkRequest: function(response){
        var self=this; 
        for(var i = 0; i<response.length; i++){
            switch (response[i].name){
                case "ibmldap":
                    self.setState({
                        visibleIBMLink: true,
                    });
                    self.setState({
                        urlIBM: response[i].url,
                    });
                break;
                case "google":
                    self.setState({
                        visibleGooleLink: true,
                    });
                    self.setState({
                        urlgoogle: response[i].url,
                    });
                break;
                case "facebook":
                    self.setState({
                        visibleFacebookLink: true,
                    });
                    self.setState({
                        urlFacebook: response[i].url,
                    });
                break;
                case "linkedin":
                    self.setState({
                        visibleLinkedInLink: true,
                    });
                    self.setState({
                        urlLinkedIn: response[i].url,
                    });
                break;
            }       
        };
    },

    getDefaultProps: function() {
        return {   
        };
    },
    
    submitIdassLogin: function() {
        return {   
        };
    },
    
    onOrganizationIdChanged: function(orgValue) {
        this.setState({
            organizationId: orgValue
        });
      },

    submitOrgID: function () {
        this.apiRequestTwo();    
        this.setState({
            visibleOrgIdInput: false
        });
        console.log (this.state.organizationId)
    },
    
    componentWillMount: function () {
        this.getURL();
    },
    
    
  render: function() {
      
      var LinkIBM = '';
      var LinkGoogle = '';
      var LinkFacebook = '';
      var LinkLinkedIn = '';
      var SSOLogInHeading = '';
      var AuthHeading = '';
      
      if(this.state.visibleIBMLink || this.state.visibleGoogleLink || this.state.visibleFacebookLink || this.state.visibleLinkedInLink) {
          SSOLogInHeading = 'Welcome, choose how you would like to login.';
          AuthHeading = 'Or alternatively you can use:';
        } else {
            SSOLogInHeading = 'Welcome, use your IBM id to login.';
            AuthHeading = ''
        }
      
      
      if(this.state.visibleIBMLink){
          LinkIBM = <div>
                <a href={this.state.urlIBM} target="_blank">
                    <Image style={styles.loginImgLinks} theme={this.props.theme} alt="IBM" title="IBM" url={"assets/ibm.png"} width={"200"} height={"60"} onLoad={this.imageOnLoad}></Image>
                </a>
            </div>
      };
      
      if(this.state.visibleGoogleLink){
          LinkGoogle = <div>
                <a href={this.state.urlGoogle} target="_blank">
                    <Image style={styles.loginImgLinks} theme={this.props.theme} alt="Google" title="Google" url={"assets/google.png"} width={"200"} height={"60"} onLoad={this.imageOnLoad}></Image>
                </a>
            </div>
      };
      
      if(this.state.visibleFacebookLink){
          LinkFacebook =  <div>
                <a href={this.state.urlFacebook} target="_blank">
                    <Image style={styles.loginImgLinks} theme={this.props.theme} alt="Facebook" title="Facebook" url={"assets/facebook.png"} width={"200"} height={"60"} onLoad={this.imageOnLoad}></Image>
                </a>
            </div>
      };
      
      if(this.state.visibleLinkedInLink){
          LinkLinkedIn = <div>
                <a href={this.state.urlLinkedIn} target="_blank">
                    <Image style={styles.loginImgLinks} theme={this.props.theme} alt="LinkedIn" title="LinkedIn" url={"assets/resources/linkedin.png"} width={"200"} height={"60"} onLoad={this.imageOnLoad}></Image>
                </a>
            </div>
      };
      
      if (this.state.visibleOrgIdInput) {
          return(
                <div>
                    <Section headingSection="Please enter your Organization ID">
                        <div style={styles.orgIdContainer}>
                            <Label label='Organization ID' theme={this.props.theme}>
                                <InputField type='text' onChange={this.onOrganizationIdChanged} placeholder='Enter your Organization ID'>
                                </InputField>
                            </Label>
                        
                        <div style={styles.sectionText}>  <a href="https://www.ibm.com/html/" target="_blank">Can&lsquo;t remember organization ID?</a>
                        </div>
                        <Button isPrimary={true} text={'Submit'} onClick={this.submitOrgID}></Button>
                        </div>
                    </Section>
                </div>
            );
        }
        else if (this.state.visibleChooseProv) {
            return( 
                <div>
                    <Section headingSection={SSOLogInHeading}>
                        <div style={styles.idassContainer}>
                            <Label label='Login with IBM id:' theme={this.props.theme}>
                                <InputField type='email' onChange={this.handleIdassEmailChange} ref="emailInput" placeholder='Enter your IBM id' theme={this.props.theme}>
                                </InputField>
                                <InputField type='password' onChange={this.handleIdassPwChange} ref="pwInput" placeholder='Enter your Password' theme={this.props.theme}>
                                </InputField>
                                    <Button isPrimary={true} onClick={this.submitIdassLogin} text={'Login'}>
                                </Button>
                            </Label>
                        </div>
                        <div style={styles.providerContainer}>
                            <Label label={AuthHeading} theme={this.props.theme}></Label>
                                {LinkIBM}
                                {LinkGoogle}
                                {LinkLinkedIn}
                                {LinkFacebook}
                        </div>
                
                    </Section>
                </div>
            );
        }
        else if (this.state.visibleRedirectLink) {
          return(<div style={styles.redirectLinkContainer}>Please wait you will be redirected, or click <a href="https://internetofthings.ibmcloud.com/login" target="_self">IBM IDASS Login</a></div>);
        } 
      
        else {
          return(<div></div>);
        } 
    }
});

module.exports = SSOLogin;
