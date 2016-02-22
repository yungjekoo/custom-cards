var Const = {
  "CONNECTED": "CONNECTED",
  "DISCONNECTED": "DISCONNECTED",
  "PAUSED": "PAUSED",

  // card type tags (use as comma separated list)
  "NO_DATAPOINTS": "NO_DATAPOINTS",       // Do not show data set definition (e.g. usage cards)
  "SINGLE_DATAPOINT": "SINGLE_DATAPOINT", // Only one data point can be defined (not used yet)
  "EVENT_ONLY": "EVENT_ONLY",             // Do not show property field in data point definition (e.g. weather service)
  "SPECIFIC": "SPECIFIC"                  // Select properties with a special meaning (e.g. elevator)
};

module.exports = Const;
