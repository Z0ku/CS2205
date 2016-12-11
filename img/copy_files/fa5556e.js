/**
 * Created by jalloulik on 10/5/16.
 */
var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];
googletag.cmd.push(function() {
    googletag.pubads().disableInitialLoad();
});

pbjs.que.push(function() {
    pbjs.addAdUnits(adUnits);
    pbjs.aliasBidder('appnexus', 'sekindo');
    pbjs.requestBids({
        bidsBackHandler: sendAdserverRequest
    });
});

function sendAdserverRequest() {
    if (pbjs.adserverRequestSent) return;
    pbjs.adserverRequestSent = true;
    googletag.cmd.push(function() {
        pbjs.que.push(function() {
            pbjs.setTargetingForGPTAsync();
            googletag.pubads().refresh();
        });
    });
}

setTimeout(function() {
    sendAdserverRequest();
}, PREBID_TIMEOUT);