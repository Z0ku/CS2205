/**
 * Created by jalloulik on 10/8/16.
 */
var PREBID_TIMEOUT = 3000;

var adUnits = [{
    code: 'div-gpt-ad-1476065769425-0',
    sizes: [[300, 250], [300, 600]],
    bids: [
        {
            bidder: 'sovrn',
            params: {
                tagid: '399340'
            }
        },
        {
            bidder: 'sekindo',
            params: {
                placementId: '9901478'
            }
        },
        {
            bidder: 'sekindo',
            params: {
                placementId: '9901481'
            }
        },{
            bidder: 'pulsepoint',
            params: {
                cf: "300X600",
                cp: 560668,
                ct: 518593
            }
        },{
            bidder: 'pulsepoint',
            params: {
                cf: "300X250",
                cp: 560668,
                ct: 518592
            }
        }]
}, {
    code: 'div-gpt-ad-1476063557017-0',
    sizes: [728, 90],
    bids: [
        {
            bidder: 'sovrn',
            params: {
                tagid: '398683'
            }
        },
        {
            bidder: 'sekindo',
            params: {
                placementId: '9901495'
            }
        },{
            bidder: 'pulsepoint',
            params: {
                cf: "728X90",
                cp: 560668,
                ct: 518590
            }
        }]
}, {
    code: 'div-gpt-ad-1476063557017-2',
    sizes: [728, 90],
    bids: [
        {
            bidder: 'sovrn',
            params: {
                tagid: '399425'
            }
        },
        {
            bidder: 'sekindo',
            params: {
                placementId: '9901497'
            }
        },{
            bidder: 'pulsepoint',
            params: {
                cf: "728X90",
                cp: 560668,
                ct: 518591
            }
        }]
}, {
    code: 'div-gpt-ad-1476063557017-4',
    sizes: [300, 250],
    bids: [
        {
            bidder: 'sovrn',
            params: {
                tagid: '399341'
            }
        },
        {
            bidder: 'sekindo',
            params: {
                placementId: '9901486'
            }
        },{
            bidder: 'pulsepoint',
            params: {
                cf: "300X250",
                cp: 560668,
                ct: 518594
            }
        }]
}];

var pbjs = pbjs || {};
pbjs.que = pbjs.que || [];

pbjs.que.push(function () {
    pbjs.setPriceGranularity("medium");
});