var React = require('react');
var ReactWrapper = require('./ReactWrapper.jsx');
var Const = require('../util/Const');
var DashboardStore = require('./DashboardStore');
var IoTFDeviceStore = require('../../common/stores/IoTFDeviceStore');
var Actions = require('./Actions.jsx');
var Reflux = require('reflux');
var IconLink = require('../../common/components/IconLink.jsx');
var DashboardDialog = require('../../Dialog/Dialog.jsx');
var Dialog = DashboardDialog.Dialog;
var DialogTab = DashboardDialog.DialogTab;
var ButtonTab = DashboardDialog.ButtonTab;
var DialogButtons = DashboardDialog.DialogButtons;
var ColorSelection = require('../../common/components/ColorSelection.jsx');
var InputField = require('../../common/components/InputField.jsx');
var Label =require('../../common/components/Label.jsx');
var Select =require('../../common/components/Select.jsx');
var Option =require('../../common/components/Option.jsx');
var ComboBox =require('../../common/components/ComboBox.jsx');
var CheckBox =require('../../common/components/CheckBox.jsx');
var Utils =require('../util/Utils.js');
var SearchField = require('../../common/components/SearchField.jsx');
var Accordion = require('../../common/components/Accordion.jsx');
var GalleryAccordion = require('../../common/components/GalleryAccordion.jsx');
var CardGalleryItem = require('../../common/components/CardGalleryItem.jsx');
var Icon = require('../../common/components/Icon.jsx');
var IoTFDeviceStore = require('../../common/stores/IoTFDeviceStore');
var LoadIndicator = require('../../common/components/LoadIndicator.jsx');


var RPT = React.PropTypes;

var styles = {
  componentHeader: {
  fontSize: '18px',
  marginTop: '5px',
  marginBottom: '5px',
  float: 'left'
  },
  componentDescription: {
  fontSize: '14px',
  clear: 'left'
  },
  componentThumbnail: {
  width: '120px',
  marginBottom: '15px',
  marginTop: '15px',
  float: 'right',
  marginLeft: '20px'
  },
  inlineButtons: {
  clear: 'both',
  marginBottom: '15px'
  },
  td: {
  padding: '5px 30px 5px 5px'
  },
  th: {
  padding: '5px 30px 5px 5px',
  textAlign: 'left'
  },
  headerTr: {

  },
  categoryTitle:{
    clear: 'both',
    fontWeight: '600'
  },
  twoFieldContainer: {
  position: 'relative'
  },
  twoFieldsLeft: {
  width: '45%'
  },
  twoFieldsRight: {
  width: '45%',
  position: 'absolute',
  right: '0px',
  top: '0px'
  },
  typeSelectionContainer: {
  width: '100%',
  height: '74px',
  whiteSpace: 'nowrap',
  overflowX: 'auto'
  },
  typeSelectionTile: {
  width: '64px',
  height: '64px',
  position: 'relative',
  padding: '16px',
  display: 'inline-block',
  boxSizing: 'border-box',
  margin: '5px',
  transition: 'background 0.3s ease',
  cursor: 'pointer'
  },
  typeSelectionImage: {
  width: '32px',
  height: '32px',
  display: 'block',
  position: 'relative',
  transition: 'background 0.3s ease'
  },
  typeSelectionMarker: {
  position: 'relative',
  bottom: '-3px',
  transition: 'opacity 0.3s ease'
  },
  cardPreviewSeparator: {
  borderTop: '3px solid blue',
  width: '585px',
  position: 'absolute',
  left: '-35px',
  height: '340px',
  backgroundColor: 'whitesmoke'
  },
  cardPreview: {
  width: '100%',
  height: '265px',
  position: 'relative',
  overflow: 'hidden'
  },
  previewContainer: {
  transformOrigin: '0% 0%',
  position: 'relative',
  outlineOffset: '20px'
  },
  previewCover: {
  position: 'absolute',
  width: '100%',
  height: '100%',
  zIndex: 1,
  top: 0,
  left: 0
  },
  customFieldsContainer: {
  width: '470px',
  padding: '10px',
  height: '100%',
  overflowY: 'auto'
  },
  cardTabContainer: {
  borderBottom: '1px solid silver',
  fontSize: '16px',
  margin: '10px 0px',
  cursor: 'pointer',
  position: 'relative'
  },
  cardTab: {
  padding: '10px 20px',
  display: 'inline-block'
  },
  cardTabSelected: {
  borderBottom: '3px solid blue',
  color: 'blue'
  },
  cardTabCheckmark: {
  marginLeft: '10px'
  }


};

var CustomizationWizard = React.createClass({
  propTypes: {
    id: RPT.string,
    component: RPT.object,
    categories: RPT.object,
    onSubmit: RPT.func,
    onChangeType: RPT.func,
    onUpdate: RPT.func,
    scheme: RPT.number,
    title: RPT.string,
    style: RPT.object,
    nls: RPT.object,
    theme: RPT.object.isRequired,
    devices: RPT.array
  },

  getDefaultProps: function() {
  return {
    id: null,
    title: '',
    scheme: 1
  };
  },

  getInitialState: function() {
  return {
    title: this.props.title,
    description: this.props.component.parameters.description,
    color: this.props.component.parameters.color,
    component: this.props.component,
    plots: this.props.component.parameters.plots||[],
    devices: this.props.devices?this.props.devices:[],
    categories: this.props.categories,
    cardTab: '' + this.props.component.parameters.size[DashboardStore.getBreakpoint()], // only the preview tabs
    visibleTab: '' + this.props.component.parameters.size[DashboardStore.getBreakpoint()] // all tabs including settings
  };
  this.startListeningToEvents();
  },

  componentWillReceiveProps: function (props) {
    console.log("componentWillReceiveProps----------------------------",props);
    if (props.devices) {this.setState({devices:props.devices});}
    if (props.categories) {this.setState({categories:props.categories});}
    var component = Object.assign({},this.state.component);
    // clear the customization
    component.customization = undefined;
    Object.assign(component, props.component);
    component.parameters.plots = this.state.plots;

    this.setState({
      component: component,
      cardTab: '' + component.parameters.size[DashboardStore.getBreakpoint()],
      visibleTab: '' + component.parameters.size[DashboardStore.getBreakpoint()]
    });
    if (props.component.parameters.color) {this.setState({color: props.component.parameters.color});}

    this.startListeningToEvents();
  },

  onChangeType: function(name) {
    this.props.onChangeType(name);
  },

  startListeningToEvents: function() {
  if (!this.listeningToDevices) {
    this.listeningToDevices = [];
  }
  if (this.state && this.state.devices) {
    for (var i in this.state.devices) {
    var device = this.state.devices[i];
    if (device.active && !this.alreadyListeningToDevice(device.id)) {
        IoTFDeviceStore.Actions.startDeviceWatch(device.id);
        this.listeningToDevices.push(device.id);
    }
    }
  }
  },

  alreadyListeningToDevice: function(id) {
  return (this.listeningToDevices.indexOf(id) > -1);
  },

  stopListeningToEvents: function() {
  if (this.listeningToDevices) {
    for (var i in this.listeningToDevices) {
    var device = this.listeningToDevices[i];
      IoTFDeviceStore.Actions.stopDeviceWatch(device);
    }
  }
  },

  onSubmit: function() {
    this.stopListeningToEvents();

    var parameters = Object.assign({},this.state.component.parameters, {title:this.state.title, description:this.state.description, color: this.state.color,plots:this.state.plots});
    if (this.customElement) {
      parameters = Object.assign({}, parameters, this.customElement.state);
    }
    var size = 0;
    if (parseInt(this.state.cardTab) > this.state.component.sizes.length - 1) {
      size = 0;
    } else {
      size = parseInt(this.state.cardTab);
    }
    var payload = {
      id: this.props.id,
      type: parameters.component,
      parameters: parameters,
      size: size
    };
    if(this.props.id===null){
      Actions.addComponent(null,payload);
    }
    else{
      Actions.configureComponent(payload);
    }
  },

  onCancel: function() {
    this.stopListeningToEvents();
  },

  onParamUpdate: function (update) {
    var newParams = Object.assign({},this.state.component.parameters ,update);
    var newComp = Object.assign({},this.state.component, {parameters:newParams});
    this.setState({component:newComp});
  },

  onTitleChanged: function(newTitle) {
    this.onParamUpdate({title:newTitle});
    this.setState({
      title:newTitle
    });
    if (this.props.onUpdate) {
      this.props.onUpdate({title: title});
    }
  },

  onDescriptionChanged: function(desc) {
    this.onParamUpdate({description: desc});
    this.setState({
      description: desc
    });
    if (this.props.onUpdate) {
      this.props.onUpdate({desc: desc});
    }
  },

  onSchemeChanged: function(color) {
    this.onParamUpdate({color: color});
    this.setState({
      color: color
    });
    if (this.props.onUpdate) {
      this.props.onUpdate({color: color});
    }
  },

  onCardTypeChanged: function(newCompType) {
    this.props.onChangeType(newCompType);
    this.onParamUpdate({component:newCompType.name});
    if (this.props.onUpdate) {
      this.props.onUpdate({cardType: newCompType});
    }
  },

  onDataSetChange: function (payload) {
  var dataSets = this.state.plots;
  var newSets = [];
  dataSets.forEach(function(dSet){
    if(dSet.id === payload.id){
    var newSet = Object.assign({},dSet);
    newSet[payload.type] = payload.value;
    newSets.push(newSet);
    }
    else{
    newSets.push(dSet);
    }
  });
  this.setState({plots:newSets});
  },

  onAddPlot: function(type){
  var currPlots = this.state.plots;
  var emptyPlot = {
        'id': Utils.createUUID(),
        'device': type,
        'event': '',
        'property': '',
        'unit': '',
        'type': 'string',
        'label': 'New DataSet'
        };
  this.setState({
    plots: currPlots.concat([emptyPlot]),
    expandedDataPoint: emptyPlot.id,
    expandedCardTypeCategory: ''
  });
  },

  onRemovePlot: function(id) {
  var plots = this.state.plots;
  for (var i = 0; i < plots.length; i++) {
    var plot = plots[i];
    if (plot.id == id) {
    plots.splice(i,1);
    this.setState({
      plots: plots
    });
    }
  }
  },

  onDeviceSelection: function (dev) {
  console.log('TODO', dev);
  },

  changeDeviceSourceStatus: function (name, val) {
  var newSources = this.state.devices.map(function(dev){
    if(dev.id===name){
    dev.active = val;
    return dev;
    } else{
    return dev;
    }
  });
  this.setState({devices: newSources});
  var self = this;
  setTimeout(function() {
    self.startListeningToEvents();
  }, 1);
  },

  onDataSourceSearchChanged: function(value) {
    this.setState({
      dataSetFilter: value
    });
  },

  onExpand: function(id) {
    this.setState({
      expandedDataPoint: id
    });
  },

  generatePreviewComponent: function(size) {
  var card = '';
  if (this.state.component) {
    var result = this.state.component;
    var layout = {
    width: size[0],
    height: size[1]
    };
    card = <ReactWrapper theme={this.props.theme} nls={this.props.nls} module={result.module} category='Devices' id={result.id} parameters={result.parameters} sticky={true} type={result.name} layout='lg' width={layout.width} height={layout.height}/>
  }
  return card;
  },

  onCustomMounted: function(element) {
    // Not a nice solution it would be better to get the change from inside the customization dialog
    // this approach gets it from the outside
    if(element!==null){
      this.customElement = element;
      this.setState({customElement:element});
    }
    else{
      this.setState({customElement:this.customElement});
    }

  },

  applyTheme: function() {
    var theme = this.props.theme;
    Object.assign(styles.cardTabContainer, {borderBottomColor: theme.minor});
    Object.assign(styles.cardTabSelected, {borderBottomColor: theme.accent}, {color: theme.accent});
    Object.assign(styles.cardPreviewSeparator, {borderTopColor: theme.accent});
  },

  render: function() {
  this.applyTheme();
  var self = this;
  var cardTitle = this.state.title;
  var cardDescription = this.state.description;
  var description = '';
  var plots = [{id:'No data points yet'}];
  var cardType = '';
  var colorScheme = this.state.color;

  if(this.state.component){
    if(this.state.component.parameters){
      description = this.state.component.parameters.description;
      plots = this.state.plots;
      cardType = this.state.component.name;
      colorScheme = this.state.component.parameters.color;
      // make sure we have the plots assigend if this is a new card
      this.state.component.parameters.plots = this.state.plots;
    }

    var cardTypes = [];
    if (this.state.categories) {
    cardTypes = this.state.categories.Devices;
    }

    var devices = this.state.devices;
    var filteredDevices = this.state.devices.filter(function(item) {
    return !self.state.dataSetFilter || item.id.toLowerCase().indexOf(self.state.dataSetFilter.toLowerCase()) > -1;
    });

    // handle custom fields per card type
    var component = this.state.component;
    var customization;
    if (component.customization) {
      var customization = null;
      if (component.module) {
        //  new way to specify the module instead of adding it to IoTCustomization object
        customization = IoTFComponents[component.module];
      }
      if (!customization) {
        // old way to add classes to IoTCustomization
        customization = IoTCustomization;
      }
      var componentTokens = component.customization.split('.');
      for (var i in componentTokens) {
        customization = customization[componentTokens[i]];
      }
      if (customization) {
        customization = React.createElement(customization, Object.assign({}, component.parameters, {key: 'SETTINGS', ref: this.onCustomMounted, nls: this.props.nls, theme:this.props.theme, style: styles.customFieldsContainer},this.state.customElement?this.state.customElement.state:{}));
      } else {
        customization = '';
        this.customElement = undefined;
      }
    } else {
      customization = '';
      this.customElement = undefined;
    }

    var cardTabs = [];
    if (customization) {
    cardTabs.push({
      id: '###SETTINGS###',
      label: this.props.nls["Settings"],
      onClick: function() {
      self.setState({
        visibleTab: '###SETTINGS###'
      });
      }
    });
    }
    var availableSizes = ['XS','S','M','L','XL','XXL','XXL'];
    var counter = 1;
    for (var i = 0; i < component.sizes.length; i++) {
    var size = component.sizes[i];
    var label = '';
    if (size[1] == 1 && size[0] == 1) {
      counter = 0;
    }
    label += availableSizes[counter];
    counter++;

    var getOnClick = function(k) {
      return function() {
      self.setState({
        cardTab: k,
        visibleTab: k
      })
      }
    }

    cardTabs.push({
      id: i,
      label: label,
      size: size,
      onClick: getOnClick(i)
    })
    }

    var highlight = component.parameters.size[DashboardStore.getBreakpoint()];

    var categoryGallery = '';

    if(this.props.categories){
    categoryGallery = <div>
              {Object.keys(self.props.categories).map(function(category){
               return <div key={category}>
                      <GalleryAccordion theme={self.props.theme} key={category} id={category} label={category} selected={self.state.component.name }>
                    {self.props.categories[category].map(function(cardTypeItem){
                     console.log(self.state.component.name);
                    return <CardGalleryItem key={cardTypeItem.name} item={cardTypeItem} nls={self.props.nls} theme={self.props.theme} selected={cardTypeItem.name === self.state.component.name} onClick={self.onCardTypeChanged}/>
                    })}
                    </GalleryAccordion>
                  </div>
              })}
              </div>
    };

    //
    // CARD SOURCE DATA TAB
    //
    var dataPointsTab = null;
    var dataPointsSubTabs = null;
    var availableSources = ''

   // Check if devices are already available, if not show loading indicator
    if(filteredDevices.length > 0){
        availableSources=
          <table>
            <tbody>
            <tr key='header'>
              <th key='h1' style={styles.th}>
              </th>
              <th key='h2' style={styles.th}>
              {this.props.nls.resolve('DeviceID')}
              </th>
              <th key='h3' style={styles.th}>
              {this.props.nls.resolve('DeviceType')}
              </th>
            </tr>
            {filteredDevices.map(function(option) {
              var updateSourceUse = function(isUsed){
              if(isUsed){
                self.changeDeviceSourceStatus(option.id,true);
              }
              else{
                self.changeDeviceSourceStatus(option.id,false);
              }
              };
              return (
              <tr key={option.id}>
                <td key='d1' style={styles.td}>
                <CheckBox theme={self.props.theme} checked={option.active} onChange={updateSourceUse}/>
                </td>
                <td key='d2' style={styles.td}>
                {option.id}
                </td>
                <td key='d3' style={styles.td}>
                {option.type}
                </td>
              </tr>
              );
          })}
          </tbody>
        </table>;
    }
    else{
      availableSources = <LoadIndicator theme={this.props.theme}/>;
    }

    if(this.state.component.cardType.indexOf(Const.NO_DATAPOINTS) === -1){
      dataPointsTab = <DialogTab id='CardSourceData' key='CardSourceData' theme={self.props.theme} label={self.props.nls["SourceData"]} description={self.props.nls["SourceDataExpl"]} status={'active'}>
          <Label label={this.props.nls.resolve('SearchDataSource')} theme={this.props.theme}>
            <SearchField theme={this.props.theme} onChange={this.onDataSourceSearchChanged}/>
          </Label>
          {availableSources}
      </DialogTab>;


      dataPointsSubTabs = devices.map(function (dev){
      if(dev.active){
        var dSetCount = 0;
        var onAddPlot = function () {
        self.onAddPlot(dev.id);
        };
        return(
        <DialogTab subtab={1} status={'active'} key={dev.id} id={dev.id} onRemove={self.onRemovePlot} theme={self.props.theme} nls={self.props.nls} label={dev.id} description={self.props.nls["ConnectDataSet"]}>
          {plots!==undefined?plots.map(function(item) {
          var name = item.label?item.label:'';
          var event = item.event?item.event:'';
          var property = item.property?item.property:'';
          var type = item.type?item.type:'string';
          var unit = item.unit?item.unit:'';
          var minVal = item.min!==undefined?item.min:'';
          var maxVal = item.max!==undefined?item.max:'';
          var precision = item.precision?item.precision:'';

          // get some suggestions for event and property
          var cache = IoTFDeviceStore.getCache();
          var eventSuggestions = cache[dev.id];
          var propertySuggestions = [];
          if (eventSuggestions) {
            eventSuggestions = Object.keys(eventSuggestions);
            propertySuggestions = cache[dev.id][event];
            if (propertySuggestions) {
            propertySuggestions = Object.keys(propertySuggestions);
            } else {
            propertySuggestions = [];
            }
          } else {
            eventSuggestions = [];
          }

          eventSuggestions.sort();
          propertySuggestions.sort();

          var onNameChange = function(newVal){
            self.onDataSetChange({id:item.id,type:'label',value:newVal});
          };
          var onEventChange = function(newVal){
            self.onDataSetChange({id:item.id,type:'event',value:newVal});
          };
          var onPropertyChange = function(newVal){
            self.onDataSetChange({id:item.id,type:'property',value:newVal});
          };
          var onTypeChange = function(newVal){
            self.onDataSetChange({id:item.id,type:'type',value:newVal});
          };
          var onUnitChange = function(newVal){
            self.onDataSetChange({id:item.id,type:'unit',value:newVal});
          };
          var onMinValChange = function(newVal){
            self.onDataSetChange({id:item.id,type:'min',value:parseFloat(newVal)});
          };
          var onMaxValChange = function(newVal){
            self.onDataSetChange({id:item.id,type:'max',value:parseFloat(newVal)});
          };
          var onPrecisionChange = function(newVal){
            self.onDataSetChange({id:item.id,type:'precision',value:parseInt(newVal, 10)});
          };
          if(dev.id===item.device){
            var minMaxElement = '';
            var precisionElement = '';
            var unitElement = '';

            if (type == 'integer' || type == 'float') {
            minMaxElement =
              <div style={styles.twoFieldContainer}>
              <div style={styles.twoFieldsLeft}>
                <Label style={styles.twoFields} label={self.props.nls.resolve('CUST_DATASET_minValue')} theme={self.props.theme}>
                    <InputField type='number' theme={self.props.theme} onChange={onMinValChange} initialValue={minVal}></InputField>
                </Label>
              </div>
              <div style={styles.twoFieldsRight}>
                <Label style={styles.twoFields} label={self.props.nls.resolve('CUST_DATASET_maxValue')} theme={self.props.theme}>
                    <InputField type='number' theme={self.props.theme} onChange={onMaxValChange} initialValue={maxVal}></InputField>
                </Label>
              </div>
              </div>;
            }
            if (type == 'float') {
            precisionElement = <Label label={self.props.nls.resolve('CUST_DATASET_precision')} theme={self.props.theme}>
                    <InputField type='number' theme={self.props.theme} onChange={onPrecisionChange} initialValue={precision}></InputField>
                  </Label>;
            }
            if (type != 'boolean') {
            unitElement =  <Label label={self.props.nls.resolve('CUST_DATASET_unit')} theme={self.props.theme}>
                      <ComboBox theme={self.props.theme} onChange={onUnitChange} initialValue={unit}>
                      <Option value='°C' theme={self.props.theme}>°C</Option>
                      <Option value='°F' theme={self.props.theme}>°F</Option>
                      <Option value='%' theme={self.props.theme}>%</Option>
                      <Option value='Hz' theme={self.props.theme}>Hz</Option>
                      <Option value='A' theme={self.props.theme}>A</Option>
                      <Option value='V' theme={self.props.theme}>V</Option>
                      <Option value='W' theme={self.props.theme}>W</Option>
                      <Option value='VA' theme={self.props.theme}>VA</Option>
                      <Option value='Wh' theme={self.props.theme}>Wh</Option>
                      <Option value='kWh' theme={self.props.theme}>kWh</Option>
                      <Option value='°' theme={self.props.theme}>°</Option>
                      <Option value='s' theme={self.props.theme}>s</Option>
                      <Option value='min' theme={self.props.theme}>min</Option>
                      <Option value='h' theme={self.props.theme}>h</Option>
                      <Option value='d' theme={self.props.theme}>d</Option>
                      <Option value='Ohm' theme={self.props.theme}>Ohm</Option>
                      <Option value='lx' theme={self.props.theme}>lx</Option>
                      <Option value='bar' theme={self.props.theme}>bar</Option>
                      <Option value='m' theme={self.props.theme}>m</Option>
                      <Option value='gallon' theme={self.props.theme}>gallon</Option>
                      <Option value='rpm' theme={self.props.theme}>rpm</Option>
                      <Option value='ppm' theme={self.props.theme}>ppm</Option>
                      <Option value='km/h' theme={self.props.theme}>km/h</Option>
                      <Option value='mbar' theme={self.props.theme}>mbar</Option>
                      <Option value='mm' theme={self.props.theme}>mm</Option>
                      <Option value='hPa' theme={self.props.theme}>hPa</Option>
                      </ComboBox>
                    </Label>;
            }
            return (
            <Accordion theme={self.props.theme} key={item.id} id={item.id} label={name} onRemove={self.onRemovePlot} onExpand={self.onExpand} expanded={self.state.expandedDataPoint == item.id}>
            <div>
              <Label label={self.props.nls.resolve('CUST_DATASET_name')} theme={self.props.theme}>
                <InputField theme={self.props.theme} onChange={onNameChange} initialValue={name}></InputField>
              </Label>
              <Label label={self.props.nls.resolve('CUST_DATASET_event')} theme={self.props.theme}>
                <ComboBox theme={self.props.theme} onChange={onEventChange} initialValue={event}>
                {eventSuggestions.map(function(item) {
                  return <Option key={item} value={item} theme={self.props.theme}>{item}</Option>
                })}
                </ComboBox>
              </Label>
                {self.state.component.cardType.indexOf(Const.EVENT_ONLY)=== -1?<div>
                <Label label={self.props.nls.resolve('CUST_DATASET_property')} theme={self.props.theme}>
                <ComboBox theme={self.props.theme} onChange={onPropertyChange} initialValue={property}>
                {propertySuggestions.map(function(item) {
                  return <Option key={item} value={item} theme={self.props.theme}>{item}</Option>
                })}
                </ComboBox>
              </Label>
              <div style={styles.twoFieldContainer}>
              <div style={styles.twoFieldsLeft}>
                <Label label={self.props.nls.resolve('CUST_DATASET_type')} theme={self.props.theme}>
                  <Select theme={self.props.theme} onChange={onTypeChange} value={type}>
                  <Option value={'string'}>{self.props.nls.resolve('type_string')}</Option>
                  <Option value={'integer'}>{self.props.nls.resolve('type_integer')}</Option>
                  <Option value={'float'}>{self.props.nls.resolve('type_float')}</Option>
                  <Option value={'boolean'}>{self.props.nls.resolve('type_boolean')}</Option>
                  </Select>
                </Label>
              </div>
              <div style={styles.twoFieldsRight}>
                {unitElement}
              </div>
              </div>
              {minMaxElement}
              <div style={styles.twoFieldsLeft}>
              {precisionElement}
              </div></div>
              : <div/>}
            </div>
            </Accordion>
            );
          } else{
            return <div/>;
          }
          }):''}
        <IconLink id={self.props.nls["AddPlot"]} action={onAddPlot} theme={self.props.theme} color={self.props.theme.accent} icon='add-circle-outline'>{self.props.nls.resolve('CUST_DATASET_add')}</IconLink>
        </DialogTab>
        );
        }
        else{
        return <div/>;
         }
      });
    };

    var cardTypeSelection = '';
    var borderTopStyle = {};

    //only show the second card type selection when the selected component is from device catrgory
    if(this.state.component.category === 'Devices'){
      cardTypeSelection = <div style={styles.typeSelectionContainer}>
        {cardTypes.map(function(item) {
        return  <div key={item.name} style={Object.assign({}, styles.typeSelectionTile, (item.name == cardType)?{backgroundColor: self.props.theme.accent}:{})} onClick={function() {self.onCardTypeChanged(item);}}>
              <Icon key={item.thumbnail} theme={self.props.theme} style={Object.assign({}, styles.typeSelectionImage)} color='#3C3C3B' icon={item.thumbnail}/>
              <Icon style={Object.assign({}, styles.typeSelectionMarker, (item.name == cardType)?{opacity: 1}:{opacity: 0})} icon={'arrow-drop-up'} size={32} color={self.props.theme.accent} theme={self.props.theme}/>
            </div>;
        })}
      </div>;
    }
    else{
      borderTopStyle = {borderTop:'none'};
    }

    // Render Dialog start
    return (<Dialog theme={this.props.theme} title={this.state.component.id?'Edit card':'Create Card'} nls={this.props.nls} active={'General'} onCancel={self.onCancel} onSubmit={self.onSubmit}>
      <DialogTab isFirstTab={true} id='Card type' theme={self.props.theme} label={this.props.nls["Gallery"]} description={this.props.nls["GalleryExpl"]} status={'active'} >
        <div>
          <div>
          {categoryGallery}
          </div>
        </div>
      </DialogTab>
      {dataPointsTab}
      {dataPointsSubTabs}
      <DialogTab id='CardType' theme={self.props.theme} label={this.props.nls["CardType"]} description={this.props.nls["CardTypeExpl"]} status={'active'}>
      {cardTypeSelection}

      <div style={Object.assign({},styles.cardPreviewSeparator,borderTopStyle)}/>

      <div style={Object.assign({}, styles.cardTabContainer)}>
        {cardTabs.map(function(tab) {
        var checkmark = '';
        if ('' + highlight == tab.id && tab.id != '###SETTINGS###') {
          checkmark = <Icon style={styles.cardTabCheckmark} icon='check' color={self.props.theme.accent} size={16} theme={self.props.theme}/>;
        }
        return <div key={tab.id} onClick={tab.onClick} style={Object.assign({}, styles.cardTab, (self.state.visibleTab == tab.id)?styles.cardTabSelected:{})}>{tab.label}{checkmark}</div>;
        })}
      </div>

      <div style={Object.assign({}, styles.cardPreview, {borderColor: this.props.theme.accent})}>

        {cardTabs.map(function(tab) {
        if (self.state.visibleTab == tab.id) {
          if (tab.id == '###SETTINGS###') {
          if (customization) {
            return customization;
          }
          } else {
          var sizeIndex = 0;
          if (parseInt(tab.id, 10) < component.sizes.length) {
            sizeIndex = tab.id;
          }
          var size = component.sizes[sizeIndex];
          var height = size[1] * 80 + (size[1]-1) * 25;
          var width = size[0] * 137.5 + (size[0]-1) * 25;
          var factor = Math.min(1, 450/width);
          factor = Math.min(factor, 260/height);
          var style = Object.assign({}, styles.previewContainer, {transform: 'scale(' + factor + ')', width: width + 'px', height: height + 'px'});

          if (''+highlight == tab.id) {
            //style = Object.assign(style, {outline: '10px solid ' + self.props.theme.accent});
          } else {
            style = Object.assign(style, {outline: 'none'});
          }
          return  <div key={tab.id} style={style}>
                {self.generatePreviewComponent(size)}
                <div style={styles.previewCover}/>
              </div>;

          }
        }
        })}
      </div>
      </DialogTab>
      <DialogTab isSubmitTab={true} id='General' theme={self.props.theme} label={this.props.nls["CardInformation"]} description={this.props.nls["CardInformationExpl"]} status={'active'} >
      <Label label={this.props.nls.resolve('CardTitle')} theme={this.props.theme}>
        <InputField theme={this.props.theme} onChange={this.onTitleChanged} initialValue={cardTitle}></InputField>
      </Label>
      <Label label={this.props.nls.resolve('CardDescription')} theme={this.props.theme}>
        <InputField theme={this.props.theme} onChange={this.onDescriptionChanged} initialValue={cardDescription}></InputField>
      </Label>
      <Label label={this.props.nls.resolve('ColorScheme')} theme={this.props.theme}>
        <ColorSelection theme={this.props.theme} onChange={this.onSchemeChanged} initialSelection={colorScheme}></ColorSelection>
      </Label>
      </DialogTab>
    </Dialog>);
  }
  else{
    return <div/>;
  }

  }
});

module.exports = CustomizationWizard;
