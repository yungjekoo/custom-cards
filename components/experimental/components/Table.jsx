var React = require('react');
var Griddle = require('griddle-react');                                            // component based on http://griddlegriddle.github.io/Griddle/index.html
var Icon = require('./IconLink.jsx');

var RPT = React.PropTypes;

var Table = React.createClass({

  propTypes: {
    theme: RPT.object.isRequired,
    style: RPT.object,
    device: RPT.string,
    property: RPT.string,
    unit: RPT.string,
    wrapper: RPT.object,

    columns:RPT.array,
    columnMetadata:RPT.array,
    rowMetadata:RPT.array,
    metadataColumns:RPT.array,
    resultsPerPage:RPT.string,
    initialSort:RPT.string,
    customRowComponentClassName:RPT.string,
    settingsText:RPT.string,
    filterPlaceholderText:RPT.string,
    nextText:RPT.string,
    previousText:RPT.string,
    maxRowsText:RPT.string,
    showFilter:RPT.bool,
    showSettings:RPT.bool,
    useCustomRowComponent:RPT.bool,
    useGriddleIcons:RPT.bool,
    customRowComponent:RPT.func,
    showPager:RPT.bool,
    useFixedHeader:RPT.bool,
    enableInfiniteScroll:RPT.bool,
    bodyHeight:RPT.number,
    paddingHeight:RPT.number,
    rowHeight:RPT.number,
    useFixedLayout:RPT.bool,
    isSubGriddle:RPT.bool,
    enableSort:RPT.bool,
    onRowClick:RPT.func,
    noDataMessage:RPT.string,
    enableToggleCustom:RPT.bool,
    results:RPT.array,
    settingsIconComponent:RPT.string
  },

  render: function() {
	var settingsIcon = <Icon theme={this.props.theme} size="20" color="#5a5a5a" icon="settings" />;
  return (
    <div>
      <Griddle
      useGriddleStyles={false}

      columns={this.props.columns}
      columnMetadata={this.props.columnMetadata}
      rowMetadata={this.props.rowMetadata}
      resultsPerPage={this.props.resultsPerPage}
      initialSort={this.props.initialSort}
      customRowComponentClassName={this.props.customRowComponentClassName}
      settingsText={this.props.settingsText}
      filterPlaceholderText={this.props.filterPlaceholderText}
      metadataColumns={this.props.metadataColumns}
      showFilter={this.props.showFilter}
      showSettings={this.props.showSettings}
      useCustomRowComponent={this.props.useCustomRowComponent}
      useGriddleIcons={this.props.useGriddleIcons}
      customRowComponent={this.props.customRowComponent}
      showPager={this.props.showPager}
      useFixedHeader={this.props.useFixedHeader}
      enableInfiniteScroll={this.props.enableInfiniteScroll}
      bodyHeight={this.props.bodyHeight}
      infiniteScrollLoadTreshold={this.props.infiniteScrollLoadTreshold}
      useFixedLayout={this.props.useFixedLayout}
      isSubGriddle={this.props.isSubGriddle}
      enableSort={this.props.enableSort}
      onRowClick={this.props.onRowClick}
      noDataMessage={this.props.noDataMessage}
      enableToggleCustom={this.props.enableToggleCustom}
      results={this.props.results} // Used if all results are already loaded.
      settingsIconComponent={settingsIcon}
      nextText={this.props.nextText}
      previousText={this.props.previousText}
      maxRowsText={this.props.maxRowsText}
      />
    </div>
  );
  }
});

module.exports = Table;



