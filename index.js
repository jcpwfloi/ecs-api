var dateformat = require('dateformat');
var querystring = require('querystring');
var crypto = require('crypto');
var request = require('request');

class ecs {
  constructor (data) {
    this.config = data;
    this.form = {
      Format: 'JSON',
      Version: '2014-05-26',
      AccessKeyId: this.config.accessKey,
      SignatureMethod: 'HMAC-SHA1',
      Timestamp: dateformat(new Date(), 'yyyy-mm-ddThh:MM:ssZ'),
      SignatureVersion: '1.0',
      SignatureNonce: String(Math.round(Math.random() * 10000000000))
    }
  }

  buildForm (data) {
    this.form.Timestamp = dateformat(new Date(), 'yyyy-mm-dd', true) + 'T' + dateformat(new Date(), 'hh:MM:ss', true) + 'Z';

    for (var key in data)
      this.form[key] = data[key];

    var sorted = {};

    Object.keys(this.form).sort().forEach(key => {
      if (this.form[key] != '' && this.form[key] != null)
        sorted[key] = this.form[key];
    });

    this.form = sorted;
  }

  getSignature () {
    let query = 'GET&%2F&' + encodeURIComponent(querystring.stringify(this.form));
    console.log(query);

    let hash = crypto.createHmac('sha1', this.config.secretKey + '&').update(query).digest('base64');

    return hash;
  }

  request (data) {
    this.buildForm(data);

    let sign = this.getSignature();
    let params = querystring.stringify(this.form);

    return new Promise((resolve, reject) => {
      request(`http://${this.config.endpoint}/?${params}&Signature=${sign}`, (err, res, body) => {
        if (err) reject(err);
        else resolve(body);
      });
    })
  }
}

module.exports = ecs;

