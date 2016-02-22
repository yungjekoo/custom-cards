var Config = {
  auth: {
    // update with your IBM ID
    id: "mielke@de.ibm.com",
    type: "person",
    // NOTE: log in to an organization from internetofthings.ibmcloud.com and grab the LTPA token cookie (document.cookie).  Copy the LtpaToken2 value you see here and it will work temporarily (a few hours)
    cookie: "LtpaToken2=T0rfWZfeTfKyFRO4QIM9WH9T2rgDCZ1Piqr/tXQSxPpkfb/mbkF6rxw4p7RfWjDZQfZyvkoGAg+WOQtkKbXGQbtHOSPrSzJOKEFrNXZ3bPonUC2nfAF3V2soiijpb/2vkxqnLGpIyXGA8G76XEpTwv2shmmCNJBpAIIy6LGzDgR8MyfAxyO053rhQPVyCe8g2XJL1I+Te0DfQhapMtBsor+2n1VLjx40bJKjuRbJpA2tcVxXezLNbFy3r0BtW8FPm4+2/SsEZKDPukmsPZztMQw5oHwd245EajD4RuCz2gWrlhfucqhStZEEfi3XgTfURz9/uvI+LxQtk8nv2WE8ow=="
  },

  //// test stand org
  // org: "n2k9ag",
  // env: ".hou02-1.test",

  // smarter home org
  org: "6qkzjf",
  env: "",

  // edit this to match your environment
  buildPath: "/Users/frank/Documents/Projects/IoTF/workspace/iotcloud.ui.dashboard/build/"
};

module.exports = Config;
