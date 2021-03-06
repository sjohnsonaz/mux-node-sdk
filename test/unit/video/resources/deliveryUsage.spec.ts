import { expect } from 'chai';
import * as sinon from 'sinon';
import * as moxios from 'moxios';
import DeliveryUsage from '../../../../src/video/resources/deliveryUsage';

/** @test {DeliveryUsage} */
describe('Unit::DeliveryUsage', () => {
  const testApiKey = 'testApiKey';
  const testSecret = 'testSecret';
  const testDeliveryUsage = new DeliveryUsage(testApiKey, testSecret);

  // TODO: Figure out why axios and moxios don't match
  beforeEach(() => {
    moxios.install(testDeliveryUsage.http as any);
  });

  afterEach(() => {
    moxios.uninstall(testDeliveryUsage.http as any);
  });

  /** @test {DeliveryUsage.list} */
  describe('DeliveryUsage.list', () => {
    /** @test {DeliveryUsage.list} */
    it('makes a GET request to list delivery usage', done => {
      moxios.stubRequest('https://api.mux.com/video/v1/delivery-usage', {
        status: 200,
        responseText: '{"data": {"list": true}}',
      });

      const onFulfilled = sinon.spy();
      testDeliveryUsage.list().then(onFulfilled);

      return moxios.wait(() => {
        expect(onFulfilled.getCall(0).args[0].list).to.be.true;
        done();
      });
    });

    it('makes a GET request to list 100 delivery usage records offset by 2 pages with a timeframe', done => {
      moxios.stubRequest(
        'https://api.mux.com/video/v1/delivery-usage?asset_id=123&limit=100&page=2&timeframe[]=1573471440&timeframe[]=1574076240',
        {
          status: 200,
          responseText: '{"data": {"list": true}}',
        }
      );

      const onFulfilled = sinon.spy();
      const date1 =
        new Date('Mon Nov 11 2019 03:24:00 GMT-0800 (PST)').valueOf() / 1000;
      const date2 =
        new Date('Mon Nov 18 2019 03:24:00 GMT-0800 (PST)').valueOf() / 1000;
      testDeliveryUsage
        .list({
          asset_id: '123',
          limit: 100,
          page: 2,
          timeframe: [date1.toString(), date2.toString()],
        })
        .then(onFulfilled);

      return moxios.wait(() => {
        expect(onFulfilled.getCall(0).args[0].list).to.be.true;
        done();
      });
    });
  });
});
