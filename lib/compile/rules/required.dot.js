var valid = true, missing = '';
var schema = self.schema{{= it.schemaPath + '.required' }};

for (var i = 0; i < schema.length; i++) {
  var property = schema[i]
    , has = data.hasOwnProperty(schema[i])
    , valid = valid && has;

  if (!has) {
    {{? it.opts.allErrors }}
      missing += ', ' + property;
    {{??}}
      missing = property;
      break;
    {{?}}
  }
}

{{? it.opts.allErrors }}
  missing = missing.slice(2);
{{?}}

var result = {
  valid: valid,
  errors: valid ? [] : [{
    keyword: 'required',
    schema: self.schema{{= it.schemaPath + '.required' }},
    dataPath: dataPath,
    message: 'properties ' + missing + ' are missing'
    {{? it.opts.verbose }}, data: data{{?}}
  }]
};