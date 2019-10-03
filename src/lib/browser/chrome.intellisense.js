var chrome = {};
chrome.devtools = {};
chrome.declarativeWebRequest = {};
//#region Types
//#region Chrome.AccessibilityObject
chrome.AccessibilityObject = function () {
    /// <field name='type' type='string'>The type of this object, which determines the contents of 'details'.</field>
    /// <field name='name' type='string'>The localized name of the object, like OK or Password. Do not rely on an exact string match because the text will be in the user's language and may change in the future.</field>
    /// <field name='context' type='string'>The localized name of the context for the object, like the name of the surrounding toolbar or group of controls.</field>
    /// <field name='details' type=''>Other details like the state, depending on the type of object.</field>
    this.type = "";
    this.name = "";
    this.context = "";
    this.details = {};
};

//#endregion
//#region Chrome.AlertInfo
chrome.AlertInfo = function () {
    /// <field name='message' type='string'>The message the alert is showing.</field>
    this.message = "";
};

//#endregion
//#region Chrome.BlockingResponse
chrome.BlockingResponse = function () {
    /// <field name='cancel' type='boolean'>If true, the request is cancelled. Used in onBeforeRequest, this prevents the request from being sent.</field>
    /// <field name='redirectUrl' type='string'>Only used as a response to the onBeforeRequest event. If set, the original request is prevented from being sent and is instead redirected to the given URL.</field>
    /// <field name='requestHeaders' type=''>Only used as a response to the onBeforeSendHeaders event. If set, the request is made with these request headers instead.</field>
    /// <field name='responseHeaders' type=''>Only used as a response to the onHeadersReceived event. If set, the server is assumed to have responded with these response headers instead. Only return <code>responseHeaders</code> if you really want to modify the headers in order to limit the number of conflicts (only one extension may modify <code>responseHeaders</code> for each request).</field>
    /// <field name='authCredentials' type='object'>Only used as a response to the onAuthRequired event. If set, the request is made using the supplied credentials.</field>
    this.cancel = true;
    this.redirectUrl = "";
    this.requestHeaders = {};
    this.responseHeaders = {};
    this.authCredentials = {};
};

//#endregion
//#region Chrome.BookmarkTreeNode
chrome.BookmarkTreeNode = function () {
    /// <field name='id' type='string'>The unique identifier for the node. IDs are unique within the current profile, and they remain valid even after the browser is restarted.</field>
    /// <field name='parentId' type='string'>The <code>id</code> of the parent folder.  Omitted for the root node.</field>
    /// <field name='index' type='integer'>The 0-based position of this node within its parent folder.</field>
    /// <field name='url' type='string'>The URL navigated to when a user clicks the bookmark. Omitted for folders.</field>
    /// <field name='title' type='string'>The text displayed for the node.</field>
    /// <field name='dateAdded' type='number'>When this node was created, in milliseconds since the epoch (<code>new Date(dateAdded)</code>).</field>
    /// <field name='dateGroupModified' type='number'>When the contents of this folder last changed, in milliseconds since the epoch.</field>
    /// <field name='children' type='array'>An ordered list of children of this node.</field>
    this.id = "";
    this.parentId = "";
    this.index = {};
    this.url = "";
    this.title = "";
    this.dateAdded = 0;
    this.dateGroupModified = 0;
    this.children = {};
};

//#endregion
//#region Chrome.Button
chrome.Button = function () {
    this.update = function (iconPath, tooltipText, disabled) {
        /// <summary>
        /// Updates the attributes of the button. If some of the arguments are omitted or <code>null</code>, the corresponding attributes are not updated.
        /// </summary>
        /// <param name="iconPath" type="string" optional="true">Path to the new icon of the button.</param>
        /// <param name="tooltipText" type="string" optional="true">Text shown as a tooltip when user hovers the mouse over the button.</param>
        /// <param name="disabled" type="boolean" optional="true">Whether the button is disabled.</param>
        //No Callback
    };

};

//#endregion
//#region Chrome.Cache
chrome.Cache = function () {
    /// <field name='size' type='number'>The size of the cache, in bytes.</field>
    /// <field name='liveSize' type='number'>The part of the cache that is utilized, in bytes.</field>
    this.size = 0;
    this.liveSize = 0;
};

//#endregion
//#region Chrome.CancelRequest
chrome.CancelRequest = function () {
    /// <field name='instanceType' type='string'></field>
    this.instanceType = "";
};

//#endregion
//#region Chrome.CheckboxDetails
chrome.CheckboxDetails = function () {
    /// <field name='isChecked' type='boolean'>True if this checkbox is checked.</field>
    this.isChecked = true;
};

//#endregion
//#region Chrome.ChromeSetting
chrome.ChromeSetting = function () {
    this.get = function (details, callback) {
        /// <summary>
        /// Gets the value of a setting.
        /// </summary>
        /// <param name="details" type="object" optional="false">Which setting to consider.</param>
        /// <param name="callback" type="function" optional="false"></param>
        callback({});
    };

    this.set = function (details, callback) {
        /// <summary>
        /// Sets the value of a setting.
        /// </summary>
        /// <param name="details" type="object" optional="false">Which setting to change.</param>
        /// <param name="callback" type="function" optional="true">Called at the completion of the set operation.</param>
        callback();
    };

    this.clear = function (details, callback) {
        /// <summary>
        /// Clears the setting, restoring any default value.
        /// </summary>
        /// <param name="details" type="object" optional="false">Which setting to clear.</param>
        /// <param name="callback" type="function" optional="true">Called at the completion of the clear operation.</param>
        callback();
    };

};

//#endregion
//#region Chrome.ChromeSettingsOverrides
chrome.ChromeSettingsOverrides = function () {
    /// <field name='bookmarks_ui' type='object'>Settings to permit bookmarks user interface customization by extensions.</field>
    /// <field name='homepage' type='string'>New value for the homepage.</field>
    /// <field name='search_provider' type='object'>A search engine</field>
    /// <field name='startup_pages' type='array'>A new startup page to be added to the list.</field>
    this.bookmarks_ui = {};
    this.homepage = "";
    this.search_provider = {};
    this.startup_pages = {};
};

//#endregion
//#region Chrome.ClearDataOptions
chrome.ClearDataOptions = function () {
    /// <field name='since' type='number'>Clear data accumulated on or after this date, represented in milliseconds since the epoch (accessible via the getTime method of the JavaScript <code>Date</code> object). If absent, defaults to <code>0</code> (which would remove all browsing data).</field>
    this.since = 0;
};

//#endregion
//#region Chrome.ClearDataTypeSet
chrome.ClearDataTypeSet = function () {
    /// <field name='appcache' type='boolean'>Websites' appcaches.</field>
    /// <field name='cache' type='boolean'>The partition's cache. Note: This clears the entire cache regardless of the age passed to <code>clearData</code>.</field>
    /// <field name='cookies' type='boolean'>The partition's cookies.</field>
    /// <field name='downloads' type='boolean'>The partition's download list.</field>
    /// <field name='fileSystems' type='boolean'>Websites' filesystems.</field>
    /// <field name='formData' type='boolean'>The partition's stored form data.</field>
    /// <field name='history' type='boolean'>The partition's history.</field>
    /// <field name='indexedDB' type='boolean'>Websites' IndexedDB data.</field>
    /// <field name='localStorage' type='boolean'>Websites' local storage data.</field>
    /// <field name='serverBoundCertificates' type='boolean'>Server-bound certificates.</field>
    /// <field name='pluginData' type='boolean'>Plugins' data.</field>
    /// <field name='passwords' type='boolean'>Stored passwords.</field>
    /// <field name='webSQL' type='boolean'>Websites' WebSQL data.</field>
    this.appcache = true;
    this.cache = true;
    this.cookies = true;
    this.downloads = true;
    this.fileSystems = true;
    this.formData = true;
    this.history = true;
    this.indexedDB = true;
    this.localStorage = true;
    this.serverBoundCertificates = true;
    this.pluginData = true;
    this.passwords = true;
    this.webSQL = true;
};

//#endregion
//#region Chrome.ColorArray
chrome.ColorArray = function () {
};

//#endregion
//#region Chrome.ComboBoxDetails
chrome.ComboBoxDetails = function () {
    /// <field name='value' type='string'>The value of the combo box.</field>
    /// <field name='itemCount' type='integer'>The number of items in the combo box's list.</field>
    /// <field name='itemIndex' type='integer'>The 0-based index of the current value, or -1 if the user entered a value not from the list.</field>
    this.value = "";
    this.itemCount = {};
    this.itemIndex = {};
};

//#endregion
//#region Chrome.Command
chrome.Command = function () {
    /// <field name='name' type='string'>The name of the Extension Command</field>
    /// <field name='description' type='string'>The Extension Command description</field>
    /// <field name='shortcut' type='string'>The shortcut active for this command, or blank if not active.</field>
    this.name = "";
    this.description = "";
    this.shortcut = "";
};

//#endregion
//#region Chrome.ContentSetting
chrome.ContentSetting = function () {
    this.clear = function (details, callback) {
        /// <summary>
        /// Clear all content setting rules set by this extension.
        /// </summary>
        /// <param name="details" type="object" optional="false"></param>
        /// <param name="callback" type="function" optional="true"></param>
        callback();
    };

    this.get = function (details, callback) {
        /// <summary>
        /// Gets the current content setting for a given pair of URLs.
        /// </summary>
        /// <param name="details" type="object" optional="false"></param>
        /// <param name="callback" type="function" optional="false"></param>
        callback({});
    };

    this.set = function (details, callback) {
        /// <summary>
        /// Applies a new content setting rule.
        /// </summary>
        /// <param name="details" type="object" optional="false"></param>
        /// <param name="callback" type="function" optional="true"></param>
        callback();
    };

    this.getResourceIdentifiers = function (callback) {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="callback" type="function" optional="false"></param>
        callback({});
    };

};

//#endregion
//#region Chrome.ContentWindow
chrome.ContentWindow = function () {
    this.postMessage = function (message, targetOrigin) {
        /// <summary>
        /// <p>Posts a message to the embedded web content as long as the embedded content is displaying a page from the target origin. This method is available once the page has completed loading. Listen for the <a href="#event-contentload">contentload</a> event and then call the method.</p><p>The guest will be able to send replies to the embedder by posting message to <code>event.source</code> on the message event it receives.</p><p>This API is identical to the <a href="https://developer.mozilla.org/en-US/docs/DOM/window.postMessage">HTML5 postMessage API</a> for communication between web pages. The embedder may listen for replies by adding a <code>message</code> event listener to its own frame.</p>
        /// </summary>
        /// <param name="message" type="any" optional="false">Message object to send to the guest.</param>
        /// <param name="targetOrigin" type="string" optional="false">Specifies what the origin of the guest window must be for the event to be dispatched.</param>
        //No Callback
    };

};

//#endregion
//#region Chrome.Cookie
chrome.Cookie = function () {
    /// <field name='name' type='string'>The name of the cookie.</field>
    /// <field name='value' type='string'>The value of the cookie.</field>
    /// <field name='domain' type='string'>The domain of the cookie (e.g. "www.google.com", "example.com").</field>
    /// <field name='hostOnly' type='boolean'>True if the cookie is a host-only cookie (i.e. a request's host must exactly match the domain of the cookie).</field>
    /// <field name='path' type='string'>The path of the cookie.</field>
    /// <field name='secure' type='boolean'>True if the cookie is marked as Secure (i.e. its scope is limited to secure channels, typically HTTPS).</field>
    /// <field name='httpOnly' type='boolean'>True if the cookie is marked as HttpOnly (i.e. the cookie is inaccessible to client-side scripts).</field>
    /// <field name='session' type='boolean'>True if the cookie is a session cookie, as opposed to a persistent cookie with an expiration date.</field>
    /// <field name='expirationDate' type='number'>The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies.</field>
    /// <field name='storeId' type='string'>The ID of the cookie store containing this cookie, as provided in getAllCookieStores().</field>
    this.name = "";
    this.value = "";
    this.domain = "";
    this.hostOnly = true;
    this.path = "";
    this.secure = true;
    this.httpOnly = true;
    this.session = true;
    this.expirationDate = 0;
    this.storeId = "";
};

//#endregion
//#region Chrome.CookieStore
chrome.CookieStore = function () {
    /// <field name='id' type='string'>The unique identifier for the cookie store.</field>
    /// <field name='tabIds' type='array'>Identifiers of all the browser tabs that share this cookie store.</field>
    this.id = "";
    this.tabIds = {};
};

//#endregion
//#region Chrome.DataTypeSet
chrome.DataTypeSet = function () {
    /// <field name='appcache' type='boolean'>Websites' appcaches.</field>
    /// <field name='cache' type='boolean'>The browser's cache. Note: when removing data, this clears the <em>entire</em> cache: it is not limited to the range you specify.</field>
    /// <field name='cookies' type='boolean'>The browser's cookies.</field>
    /// <field name='downloads' type='boolean'>The browser's download list.</field>
    /// <field name='fileSystems' type='boolean'>Websites' file systems.</field>
    /// <field name='formData' type='boolean'>The browser's stored form data.</field>
    /// <field name='history' type='boolean'>The browser's history.</field>
    /// <field name='indexedDB' type='boolean'>Websites' IndexedDB data.</field>
    /// <field name='localStorage' type='boolean'>Websites' local storage data.</field>
    /// <field name='serverBoundCertificates' type='boolean'>Server-bound certificates.</field>
    /// <field name='pluginData' type='boolean'>Plugins' data.</field>
    /// <field name='passwords' type='boolean'>Stored passwords.</field>
    /// <field name='webSQL' type='boolean'>Websites' WebSQL data.</field>
    this.appcache = true;
    this.cache = true;
    this.cookies = true;
    this.downloads = true;
    this.fileSystems = true;
    this.formData = true;
    this.history = true;
    this.indexedDB = true;
    this.localStorage = true;
    this.serverBoundCertificates = true;
    this.pluginData = true;
    this.passwords = true;
    this.webSQL = true;
};

//#endregion
//#region Chrome.DataTypeSet
chrome.DataTypeSet = function () {
    /// <field name='appcache' type='boolean'>Websites' appcaches.</field>
    /// <field name='cookies' type='boolean'>The browser's cookies.</field>
    /// <field name='fileSystems' type='boolean'>Websites' file systems.</field>
    /// <field name='indexedDB' type='boolean'>Websites' IndexedDB data.</field>
    /// <field name='localStorage' type='boolean'>Websites' local storage data.</field>
    /// <field name='webSQL' type='boolean'>Websites' WebSQL data.</field>
    this.appcache = true;
    this.cookies = true;
    this.fileSystems = true;
    this.indexedDB = true;
    this.localStorage = true;
    this.webSQL = true;
};

//#endregion
//#region Chrome.Debuggee
chrome.Debuggee = function () {
    /// <field name='tabId' type='integer'>The id of the tab which you intend to debug.</field>
    /// <field name='extensionId' type='string'>The id of the extension which you intend to debug. Attaching to an extension background page is only possible when 'enable-silent-debugging' flag is enabled on the target browser.</field>
    /// <field name='targetId' type='string'>The opaque id of the debug target.</field>
    this.tabId = {};
    this.extensionId = "";
    this.targetId = "";
};

//#endregion
//#region Chrome.declarativeWebRequest.AddRequestCookie
chrome.declarativeWebRequest.AddRequestCookie = function () {
    /// <field name='instanceType' type='string'></field>
    /// <field name='cookie' type=''>Cookie to be added to the request. No field may be undefined.</field>
    this.instanceType = "";
    this.cookie = {};
};

//#endregion
//#region Chrome.declarativeWebRequest.AddResponseCookie
chrome.declarativeWebRequest.AddResponseCookie = function () {
    /// <field name='instanceType' type='string'></field>
    /// <field name='cookie' type=''>Cookie to be added to the response. The name and value need to be specified.</field>
    this.instanceType = "";
    this.cookie = {};
};

//#endregion
//#region Chrome.declarativeWebRequest.AddResponseHeader
chrome.declarativeWebRequest.AddResponseHeader = function () {
    /// <field name='instanceType' type='string'></field>
    /// <field name='name' type='string'>HTTP response header name.</field>
    /// <field name='value' type='string'>HTTP response header value.</field>
    this.instanceType = "";
    this.name = "";
    this.value = "";
};

//#endregion
//#region Chrome.declarativeWebRequest.EditRequestCookie
chrome.declarativeWebRequest.EditRequestCookie = function () {
    /// <field name='instanceType' type='string'></field>
    /// <field name='filter' type=''>Filter for cookies that will be modified. All empty entries are ignored.</field>
    /// <field name='modification' type=''>Attributes that shall be overridden in cookies that machted the filter. Attributes that are set to an empty string are removed.</field>
    this.instanceType = "";
    this.filter = {};
    this.modification = {};
};

//#endregion
//#region Chrome.declarativeWebRequest.EditResponseCookie
chrome.declarativeWebRequest.EditResponseCookie = function () {
    /// <field name='instanceType' type='string'></field>
    /// <field name='filter' type=''>Filter for cookies that will be modified. All empty entries are ignored.</field>
    /// <field name='modification' type=''>Attributes that shall be overridden in cookies that machted the filter. Attributes that are set to an empty string are removed.</field>
    this.instanceType = "";
    this.filter = {};
    this.modification = {};
};

//#endregion
//#region Chrome.declarativeWebRequest.FilterResponseCookie
chrome.declarativeWebRequest.FilterResponseCookie = function () {
    /// <field name='name' type='string'>Name of a cookie.</field>
    /// <field name='value' type='string'>Value of a cookie, may be padded in double-quotes.</field>
    /// <field name='expires' type='string'>Value of the Expires cookie attribute.</field>
    /// <field name='maxAge' type='number'>Value of the Max-Age cookie attribute</field>
    /// <field name='domain' type='string'>Value of the Domain cookie attribute.</field>
    /// <field name='path' type='string'>Value of the Path cookie attribute.</field>
    /// <field name='secure' type='string'>Existence of the Secure cookie attribute.</field>
    /// <field name='httpOnly' type='string'>Existence of the HttpOnly cookie attribute.</field>
    /// <field name='ageUpperBound' type='integer'>Inclusive upper bound on the cookie lifetime (specified in seconds after current time). Only cookies whose expiration date-time is in the interval [now, now + ageUpperBound] fulfill this criterion. Session cookies and cookies whose expiration date-time is in the past do not meet the criterion of this filter. The cookie lifetime is calculated from either 'max-age' or 'expires' cookie attributes. If both are specified, 'max-age' is used to calculate the cookie lifetime.</field>
    /// <field name='ageLowerBound' type='integer'>Inclusive lower bound on the cookie lifetime (specified in seconds after current time). Only cookies whose expiration date-time is set to 'now + ageLowerBound' or later fulfill this criterion. Session cookies do not meet the criterion of this filter. The cookie lifetime is calculated from either 'max-age' or 'expires' cookie attributes. If both are specified, 'max-age' is used to calculate the cookie lifetime.</field>
    /// <field name='sessionCookie' type='boolean'>Filters session cookies. Session cookies have no lifetime specified in any of 'max-age' or 'expires' attributes.</field>
    this.name = "";
    this.value = "";
    this.expires = "";
    this.maxAge = 0;
    this.domain = "";
    this.path = "";
    this.secure = "";
    this.httpOnly = "";
    this.ageUpperBound = {};
    this.ageLowerBound = {};
    this.sessionCookie = true;
};

//#endregion
//#region Chrome.declarativeWebRequest.IgnoreRules
chrome.declarativeWebRequest.IgnoreRules = function () {
    /// <field name='instanceType' type='string'></field>
    /// <field name='lowerPriorityThan' type='integer'>If set, rules with a lower priority than the specified value are ignored. This boundary is not persisted, it affects only rules and their actions of the same network request stage.</field>
    /// <field name='hasTag' type='string'>If set, rules with the specified tag are ignored. This ignoring is not persisted, it affects only rules and their actions of the same network request stage. Note that rules are executed in descending order of their priorities. This action affects rules of lower priority than the current rule. Rules with the same priority may or may not be ignored.</field>
    this.instanceType = "";
    this.lowerPriorityThan = {};
    this.hasTag = "";
};

//#endregion
//#region Chrome.declarativeWebRequest.RedirectByRegEx
chrome.declarativeWebRequest.RedirectByRegEx = function () {
    /// <field name='instanceType' type='string'></field>
    /// <field name='from' type='string'>A match pattern that may contain capture groups. Capture groups are referenced in the Perl syntax ($1, $2, ...) instead of the RE2 syntax (\1, \2, ...) in order to be closer to JavaScript Regular Expressions.</field>
    /// <field name='to' type='string'>Destination pattern.</field>
    this.instanceType = "";
    this.from = "";
    this.to = "";
};

//#endregion
//#region Chrome.declarativeWebRequest.RedirectToEmptyDocument
chrome.declarativeWebRequest.RedirectToEmptyDocument = function () {
    /// <field name='instanceType' type='string'></field>
    this.instanceType = "";
};

//#endregion
//#region Chrome.declarativeWebRequest.RedirectToTransparentImage
chrome.declarativeWebRequest.RedirectToTransparentImage = function () {
    /// <field name='instanceType' type='string'></field>
    this.instanceType = "";
};

//#endregion
//#region Chrome.declarativeWebRequest.RemoveRequestCookie
chrome.declarativeWebRequest.RemoveRequestCookie = function () {
    /// <field name='instanceType' type='string'></field>
    /// <field name='filter' type=''>Filter for cookies that will be removed. All empty entries are ignored.</field>
    this.instanceType = "";
    this.filter = {};
};

//#endregion
//#region Chrome.declarativeWebRequest.RemoveRequestHeader
chrome.declarativeWebRequest.RemoveRequestHeader = function () {
    /// <field name='instanceType' type='string'></field>
    /// <field name='name' type='string'>HTTP request header name (case-insensitive).</field>
    this.instanceType = "";
    this.name = "";
};

//#endregion
//#region Chrome.declarativeWebRequest.RemoveResponseCookie
chrome.declarativeWebRequest.RemoveResponseCookie = function () {
    /// <field name='instanceType' type='string'></field>
    /// <field name='filter' type=''>Filter for cookies that will be removed. All empty entries are ignored.</field>
    this.instanceType = "";
    this.filter = {};
};

//#endregion
//#region Chrome.declarativeWebRequest.RemoveResponseHeader
chrome.declarativeWebRequest.RemoveResponseHeader = function () {
    /// <field name='instanceType' type='string'></field>
    /// <field name='name' type='string'>HTTP request header name (case-insensitive).</field>
    /// <field name='value' type='string'>HTTP request header value (case-insensitive).</field>
    this.instanceType = "";
    this.name = "";
    this.value = "";
};

//#endregion
//#region Chrome.declarativeWebRequest.RequestCookie
chrome.declarativeWebRequest.RequestCookie = function () {
    /// <field name='name' type='string'>Name of a cookie.</field>
    /// <field name='value' type='string'>Value of a cookie, may be padded in double-quotes.</field>
    this.name = "";
    this.value = "";
};

//#endregion
//#region Chrome.declarativeWebRequest.ResponseCookie
chrome.declarativeWebRequest.ResponseCookie = function () {
    /// <field name='name' type='string'>Name of a cookie.</field>
    /// <field name='value' type='string'>Value of a cookie, may be padded in double-quotes.</field>
    /// <field name='expires' type='string'>Value of the Expires cookie attribute.</field>
    /// <field name='maxAge' type='number'>Value of the Max-Age cookie attribute</field>
    /// <field name='domain' type='string'>Value of the Domain cookie attribute.</field>
    /// <field name='path' type='string'>Value of the Path cookie attribute.</field>
    /// <field name='secure' type='string'>Existence of the Secure cookie attribute.</field>
    /// <field name='httpOnly' type='string'>Existence of the HttpOnly cookie attribute.</field>
    this.name = "";
    this.value = "";
    this.expires = "";
    this.maxAge = 0;
    this.domain = "";
    this.path = "";
    this.secure = "";
    this.httpOnly = "";
};

//#endregion
//#region Chrome.declarativeWebRequest.SendMessageToExtension
chrome.declarativeWebRequest.SendMessageToExtension = function () {
    /// <field name='instanceType' type='string'></field>
    /// <field name='message' type='string'>The value that will be passed in the <code>message</code> attribute of the dictionary that is passed to the event handler.</field>
    this.instanceType = "";
    this.message = "";
};

//#endregion
//#region Chrome.declarativeWebRequest.SetRequestHeader
chrome.declarativeWebRequest.SetRequestHeader = function () {
    /// <field name='instanceType' type='string'></field>
    /// <field name='name' type='string'>HTTP request header name.</field>
    /// <field name='value' type='string'>HTTP request header value.</field>
    this.instanceType = "";
    this.name = "";
    this.value = "";
};

//#endregion
//#region Chrome.DefaultSuggestResult
chrome.DefaultSuggestResult = function () {
    /// <field name='description' type='string'>The text that is displayed in the URL dropdown. Can contain XML-style markup for styling. The supported tags are 'url' (for a literal URL), 'match' (for highlighting text that matched what the user's query), and 'dim' (for dim helper text). The styles can be nested, eg. <dim><match>dimmed match</match></dim>.</field>
    /// <field name='descriptionStyles' type='array'>An array of style ranges for the description, as provided by the extension.</field>
    /// <field name='descriptionStylesRaw' type='array'>An array of style ranges for the description, as provided by ToValue().</field>
    this.description = "";
    this.descriptionStyles = {};
    this.descriptionStylesRaw = {};
};

//#endregion
//#region Chrome.DesktopCaptureSourceType
chrome.DesktopCaptureSourceType = function () {
};

//#endregion
//#region Chrome.Details
chrome.Details = function () {
};

//#endregion
//#region Chrome.Device
chrome.Device = function () {
    /// <field name='info' type='string'>Represents all information about a foreign device.</field>
    /// <field name='sessions' type='array'>A list of open window sessions for the foreign device, sorted from most recently to least recently modified session.</field>
    this.info = "";
    this.sessions = {};
};

//#endregion
//#region Chrome.DialogController
chrome.DialogController = function () {
    this.ok = function (response) {
        /// <summary>
        /// Accept the dialog. Equivalent to clicking OK in an <code>alert</code>, <code>confirm</code>, or <code>prompt</code> dialog.
        /// </summary>
        /// <param name="response" type="string" optional="true">The response string to provide to the guest when accepting a <code>prompt</code> dialog.</param>
        //No Callback
    };

    this.cancel = function () {
        /// <summary>
        /// Reject the dialog. Equivalent to clicking Cancel in a <code>confirm</code> or <code>prompt</code> dialog.
        /// </summary>
        //No Callback
    };

};

//#endregion
//#region Chrome.DOMWindow
chrome.DOMWindow = function () {
};

//#endregion
//#region Chrome.DownloadPermissionRequest
chrome.DownloadPermissionRequest = function () {
    /// <field name='requestMethod' type='string'>The HTTP request type (e.g. <code>GET</code>) associated with the download request.</field>
    /// <field name='url' type='string'>The requested download URL.</field>
    this.requestMethod = "";
    this.url = "";
    this.allow = function () {
        /// <summary>
        /// Allow the permission request.
        /// </summary>
        //No Callback
    };

    this.deny = function () {
        /// <summary>
        /// Deny the permission request. This is the default behavior if <code>allow</code> is not called.
        /// </summary>
        //No Callback
    };

};

//#endregion
//#region Chrome.ElementsPanel
chrome.ElementsPanel = function () {
    this.createSidebarPane = function (title, callback) {
        /// <summary>
        /// Creates a pane within panel's sidebar.
        /// </summary>
        /// <param name="title" type="string" optional="false">Text that is displayed in sidebar caption.</param>
        /// <param name="callback" type="function" optional="true">A callback invoked when the sidebar is created.</param>
        callback(new chrome.ExtensionSidebarPane());
    };

};

//#endregion
//#region Chrome.Event
chrome.Event = function () {
    this.addListener = function (callback) {
        /// <summary>
        /// Registers an event listener <em>callback</em> to an event.
        /// </summary>
        /// <param name="callback" type="function" optional="false">Called when an event occurs. The parameters of this function depend on the type of event.</param>
        callback();
    };

    this.removeListener = function (callback) {
        /// <summary>
        /// Deregisters an event listener <em>callback</em> from an event.
        /// </summary>
        /// <param name="callback" type="function" optional="false">Listener that shall be unregistered.</param>
        callback();
    };

    this.hasListener = function (callback) {
        /// <summary>
        /// </summary>
        /// <param name="callback" type="function" optional="false">Listener whose registration status shall be tested.</param>
        callback();
        return true;
    };

    this.hasListeners = function () {
        /// <summary>
        /// </summary>
        //No Callback
        return true;
    };

    this.addRules = function (eventName, webViewInstanceId, rules, callback) {
        /// <summary>
        /// Registers rules to handle events.
        /// </summary>
        /// <param name="eventName" type="string" optional="false">Name of the event this function affects.</param>
        /// <param name="webViewInstanceId" type="integer" optional="false">If provided, this is an integer that uniquely identfies the <webview> associated with this function call.</param>
        /// <param name="rules" type="array" optional="false">Rules to be registered. These do not replace previously registered rules.</param>
        /// <param name="callback" type="function" optional="true">Called with registered rules.</param>
        callback({});
    };

    this.getRules = function (eventName, webViewInstanceId, ruleIdentifiers, callback) {
        /// <summary>
        /// Returns currently registered rules.
        /// </summary>
        /// <param name="eventName" type="string" optional="false">Name of the event this function affects.</param>
        /// <param name="webViewInstanceId" type="integer" optional="false">If provided, this is an integer that uniquely identfies the <webview> associated with this function call.</param>
        /// <param name="ruleIdentifiers" type="array" optional="true">If an array is passed, only rules with identifiers contained in this array are returned.</param>
        /// <param name="callback" type="function" optional="false">Called with registered rules.</param>
        callback({});
    };

    this.removeRules = function (eventName, webViewInstanceId, ruleIdentifiers, callback) {
        /// <summary>
        /// Unregisters currently registered rules.
        /// </summary>
        /// <param name="eventName" type="string" optional="false">Name of the event this function affects.</param>
        /// <param name="webViewInstanceId" type="integer" optional="false">If provided, this is an integer that uniquely identfies the <webview> associated with this function call.</param>
        /// <param name="ruleIdentifiers" type="array" optional="true">If an array is passed, only rules with identifiers contained in this array are unregistered.</param>
        /// <param name="callback" type="function" optional="true">Called when rules were unregistered.</param>
        callback();
    };

};

//#endregion
//#region Chrome.ExtensionInfo
chrome.ExtensionInfo = function () {
    /// <field name='id' type='string'>The extension's unique identifier.</field>
    /// <field name='name' type='string'>The name of this extension, app, or theme.</field>
    /// <field name='shortName' type='string'>A short version of the name of this extension, app, or theme.</field>
    /// <field name='description' type='string'>The description of this extension, app, or theme.</field>
    /// <field name='version' type='string'>The <a href='manifest/version.html'>version</a> of this extension, app, or theme.</field>
    /// <field name='mayDisable' type='boolean'>Whether this extension can be disabled or uninstalled by the user.</field>
    /// <field name='enabled' type='boolean'>Whether it is currently enabled or disabled.</field>
    /// <field name='disabledReason' type='string'>A reason the item is disabled.</field>
    /// <field name='isApp' type='boolean'>True if this is an app.</field>
    /// <field name='type' type='string'>The type of this extension, app, or theme.</field>
    /// <field name='appLaunchUrl' type='string'>The launch url (only present for apps).</field>
    /// <field name='homepageUrl' type='string'>The URL of the homepage of this extension, app, or theme.</field>
    /// <field name='updateUrl' type='string'>The update URL of this extension, app, or theme.</field>
    /// <field name='offlineEnabled' type='boolean'>Whether the extension, app, or theme declares that it supports offline.</field>
    /// <field name='optionsUrl' type='string'>The url for the item's options page, if it has one.</field>
    /// <field name='icons' type='array'>A list of icon information. Note that this just reflects what was declared in the manifest, and the actual image at that url may be larger or smaller than what was declared, so you might consider using explicit width and height attributes on img tags referencing these images. See the <a href='manifest/icons.html'>manifest documentation on icons</a> for more details.</field>
    /// <field name='permissions' type='array'>Returns a list of API based permissions.</field>
    /// <field name='hostPermissions' type='array'>Returns a list of host based permissions.</field>
    /// <field name='installType' type='string'>How the extension was installed. One of<br><var>admin</var>: The extension was installed because of an administrative policy,<br><var>development</var>: The extension was loaded unpacked in developer mode,<br><var>normal</var>: The extension was installed normally via a .crx file,<br><var>sideload</var>: The extension was installed by other software on the machine,<br><var>other</var>: The extension was installed by other means.</field>
    this.id = "";
    this.name = "";
    this.shortName = "";
    this.description = "";
    this.version = "";
    this.mayDisable = true;
    this.enabled = true;
    this.disabledReason = "";
    this.isApp = true;
    this.type = "";
    this.appLaunchUrl = "";
    this.homepageUrl = "";
    this.updateUrl = "";
    this.offlineEnabled = true;
    this.optionsUrl = "";
    this.icons = {};
    this.permissions = {};
    this.hostPermissions = {};
    this.installType = "";
};

//#endregion
//#region Chrome.ExtensionPanel
chrome.ExtensionPanel = function () {
    this.createStatusBarButton = function (iconPath, tooltipText, disabled) {
        /// <summary>
        /// Appends a button to the status bar of the panel.
        /// </summary>
        /// <param name="iconPath" type="string" optional="false">Path to the icon of the button. The file should contain a 64x24-pixel image composed of two 32x24 icons. The left icon is used when the button is inactive; the right icon is displayed when the button is pressed.</param>
        /// <param name="tooltipText" type="string" optional="false">Text shown as a tooltip when user hovers the mouse over the button.</param>
        /// <param name="disabled" type="boolean" optional="false">Whether the button is disabled.</param>
        //No Callback
        return new chrome.Button;
    };

};

//#endregion
//#region Chrome.ExtensionSidebarPane
chrome.ExtensionSidebarPane = function () {
    this.setHeight = function (height) {
        /// <summary>
        /// Sets the height of the sidebar.
        /// </summary>
        /// <param name="height" type="string" optional="false">A CSS-like size specification, such as <code>'100px'</code> or <code>'12ex'</code>.</param>
        //No Callback
    };

    this.setExpression = function (expression, rootTitle, callback) {
        /// <summary>
        /// Sets an expression that is evaluated within the inspected page. The result is displayed in the sidebar pane.
        /// </summary>
        /// <param name="expression" type="string" optional="false">An expression to be evaluated in context of the inspected page. JavaScript objects and DOM nodes are displayed in an expandable tree similar to the console/watch.</param>
        /// <param name="rootTitle" type="string" optional="true">An optional title for the root of the expression tree.</param>
        /// <param name="callback" type="function" optional="true">A callback invoked after the sidebar pane is updated with the expression evaluation results.</param>
        callback();
    };

    this.setObject = function (jsonObject, rootTitle, callback) {
        /// <summary>
        /// Sets a JSON-compliant object to be displayed in the sidebar pane.
        /// </summary>
        /// <param name="jsonObject" type="string" optional="false">An object to be displayed in context of the inspected page. Evaluated in the context of the caller (API client).</param>
        /// <param name="rootTitle" type="string" optional="true">An optional title for the root of the expression tree.</param>
        /// <param name="callback" type="function" optional="true">A callback invoked after the sidebar is updated with the object.</param>
        callback();
    };

    this.setPage = function (path) {
        /// <summary>
        /// Sets an HTML page to be displayed in the sidebar pane.
        /// </summary>
        /// <param name="path" type="string" optional="false">Relative path of an extension page to display within the sidebar.</param>
        //No Callback
    };

};

//#endregion
//#region Chrome.ExternallyConnectable
chrome.ExternallyConnectable = function () {
    /// <field name='ids' type='array'><p>The IDs of extensions or apps that are allowed to connect. If left empty or unspecified, no extensions or apps can connect.</p><p>The wildcard <code>"*"</code> will allow all extensions and apps to connect.</p></field>
    /// <field name='matches' type='array'><p>The URL patterns for <em>web pages</em> that are allowed to connect. <em>This does not affect content scripts.</em> If left empty or unspecified, no web pages can connect.</p><p>Patterns cannot include wildcard domains nor subdomains of (effective) top level domains; <code>*://google.com/*</code> and <code>http://*.chromium.org/*</code> are valid, while <code>&lt;all_urls&gt;</code>, <code>http://*/*</code>, <code>*://*.com/*</code>, and even <code>http://*.appspot.com/*</code> are not.</p></field>
    /// <field name='accepts_tls_channel_id' type='boolean'>If <code>true</code>, messages sent via ref:runtime.connect or ref:runtime.sendMessage will set ref:runtime.MessageSender.tlsChannelId if those methods request it to be. If <code>false</code>, ref:runtime.MessageSender.tlsChannelId will never be set under any circumstance.</field>
    this.ids = {};
    this.matches = {};
    this.accepts_tls_channel_id = true;
};

//#endregion
//#region Chrome.FileEntryInfo
chrome.FileEntryInfo = function () {
    /// <field name='fileSystemName' type='string'></field>
    /// <field name='fileSystemRoot' type='string'></field>
    /// <field name='fileFullPath' type='string'></field>
    /// <field name='fileIsDirectory' type='boolean'></field>
    this.fileSystemName = "";
    this.fileSystemRoot = "";
    this.fileFullPath = "";
    this.fileIsDirectory = true;
};

//#endregion
//#region Chrome.FileHandlerExecuteEventDetails
chrome.FileHandlerExecuteEventDetails = function () {
    /// <field name='entries' type='array'>Array of Entry instances representing files that are targets of this action (selected in ChromeOS file browser).</field>
    /// <field name='tab_id' type='integer'>The ID of the tab that raised this event. Tab IDs are unique within a browser session.</field>
    this.entries = {};
    this.tab_id = {};
};

//#endregion
//#region Chrome.Filter
chrome.Filter = function () {
    /// <field name='maxResults' type='integer'>The maximum number of entries to be fetched in the requested list. Omit this parameter to fetch the maximum number of entries (ref:MAX_SESSION_RESULTS).</field>
    this.maxResults = {};
};

//#endregion
//#region Chrome.FontName
chrome.FontName = function () {
    /// <field name='fontId' type='string'>The font ID.</field>
    /// <field name='displayName' type='string'>The display name of the font.</field>
    this.fontId = "";
    this.displayName = "";
};

//#endregion
//#region Chrome.GenericFamily
chrome.GenericFamily = function () {
};

//#endregion
//#region Chrome.GeolocationPermissionRequest
chrome.GeolocationPermissionRequest = function () {
    /// <field name='url' type='string'>The URL of the frame requesting access to geolocation data.</field>
    this.url = "";
    this.allow = function () {
        /// <summary>
        /// Allow the permission request.
        /// </summary>
        //No Callback
    };

    this.deny = function () {
        /// <summary>
        /// Deny the permission request. This is the default behavior if <code>allow</code> is not called.
        /// </summary>
        //No Callback
    };

};

//#endregion
//#region Chrome.HeaderFilter
chrome.HeaderFilter = function () {
    /// <field name='namePrefix' type='string'>Matches if the header name starts with the specified string.</field>
    /// <field name='nameSuffix' type='string'>Matches if the header name ends with the specified string.</field>
    /// <field name='nameContains' type=''>Matches if the header name contains all of the specified strings.</field>
    /// <field name='nameEquals' type='string'>Matches if the header name is equal to the specified string.</field>
    /// <field name='valuePrefix' type='string'>Matches if the header value starts with the specified string.</field>
    /// <field name='valueSuffix' type='string'>Matches if the header value ends with the specified string.</field>
    /// <field name='valueContains' type=''>Matches if the header value contains all of the specified strings.</field>
    /// <field name='valueEquals' type='string'>Matches if the header value is equal to the specified string.</field>
    this.namePrefix = "";
    this.nameSuffix = "";
    this.nameContains = {};
    this.nameEquals = "";
    this.valuePrefix = "";
    this.valueSuffix = "";
    this.valueContains = {};
    this.valueEquals = "";
};

//#endregion
//#region Chrome.HistoryItem
chrome.HistoryItem = function () {
    /// <field name='id' type='string'>The unique identifier for the item.</field>
    /// <field name='url' type='string'>The URL navigated to by a user.</field>
    /// <field name='title' type='string'>The title of the page when it was last loaded.</field>
    /// <field name='lastVisitTime' type='number'>When this page was last loaded, represented in milliseconds since the epoch.</field>
    /// <field name='visitCount' type='integer'>The number of times the user has navigated to this page.</field>
    /// <field name='typedCount' type='integer'>The number of times the user has navigated to this page by typing in the address.</field>
    this.id = "";
    this.url = "";
    this.title = "";
    this.lastVisitTime = 0;
    this.visitCount = {};
    this.typedCount = {};
};

//#endregion
//#region Chrome.HttpHeaders
chrome.HttpHeaders = function () {
};

//#endregion
//#region Chrome.IconInfo
chrome.IconInfo = function () {
    /// <field name='size' type='integer'>A number representing the width and height of the icon. Likely values include (but are not limited to) 128, 48, 24, and 16.</field>
    /// <field name='url' type='string'>The URL for this icon image. To display a grayscale version of the icon (to indicate that an extension is disabled, for example), append <code>?grayscale=true</code> to the URL.</field>
    this.size = {};
    this.url = "";
};

//#endregion
//#region Chrome.ImageDataType
chrome.ImageDataType = function () {
};

//#endregion
//#region Chrome.ImageDataType
chrome.ImageDataType = function () {
};

//#endregion
//#region Chrome.ImageDetails
chrome.ImageDetails = function () {
    /// <field name='format' type='string'>The format of the resulting image.  Default is <code>"jpeg"</code>.</field>
    /// <field name='quality' type='integer'>When format is <code>"jpeg"</code>, controls the quality of the resulting image.  This value is ignored for PNG images.  As quality is decreased, the resulting image will have more visual artifacts, and the number of bytes needed to store it will decrease.</field>
    this.format = "";
    this.quality = {};
};

//#endregion
//#region Chrome.InjectDetails
chrome.InjectDetails = function () {
    /// <field name='code' type='string'>JavaScript or CSS code to inject.</field>
    /// <field name='file' type='string'>JavaScript or CSS file to inject.</field>
    /// <field name='allFrames' type='boolean'>If allFrames is <code>true</code>, implies that the JavaScript or CSS should be injected into all frames of current page. By default, it's <code>false</code> and is only injected into the top frame.</field>
    /// <field name='runAt' type='string'>The soonest that the JavaScript or CSS will be injected into the tab. Defaults to "document_idle".</field>
    this.code = "";
    this.file = "";
    this.allFrames = true;
    this.runAt = "";
};

//#endregion
//#region Chrome.InjectDetails
chrome.InjectDetails = function () {
    /// <field name='code' type='string'>JavaScript or CSS code to inject.</field>
    /// <field name='file' type='string'>JavaScript or CSS file to inject.</field>
    this.code = "";
    this.file = "";
};

//#endregion
//#region Chrome.InputContext
chrome.InputContext = function () {
    /// <field name='contextID' type='integer'>This is used to specify targets of text field operations.  This ID becomes invalid as soon as onBlur is called.</field>
    /// <field name='type' type='string'>Type of value this text field edits, (Text, Number, URL, etc)</field>
    this.contextID = {};
    this.type = "";
};

//#endregion
//#region Chrome.KeyboardEvent
chrome.KeyboardEvent = function () {
    /// <field name='type' type='string'>One of keyup or keydown.</field>
    /// <field name='requestId' type='string'>The ID of the request.</field>
    /// <field name='key' type='string'>Value of the key being pressed</field>
    /// <field name='code' type='string'>Value of the physical key being pressed. The value is not affected by current keyboard layout or modifier state.</field>
    /// <field name='altKey' type='boolean'>Whether or not the ALT key is pressed.</field>
    /// <field name='ctrlKey' type='boolean'>Whether or not the CTRL key is pressed.</field>
    /// <field name='shiftKey' type='boolean'>Whether or not the SHIFT key is pressed.</field>
    /// <field name='capsLock' type='boolean'>Whether or not the CAPS_LOCK is enabled.</field>
    this.type = "";
    this.requestId = "";
    this.key = "";
    this.code = "";
    this.altKey = true;
    this.ctrlKey = true;
    this.shiftKey = true;
    this.capsLock = true;
};

//#endregion
//#region Chrome.LevelOfControl
chrome.LevelOfControl = function () {
};

//#endregion
//#region Chrome.ListBoxDetails
chrome.ListBoxDetails = function () {
    /// <field name='value' type='string'>The value of the list box.</field>
    /// <field name='itemCount' type='integer'>The number of items in the list.</field>
    /// <field name='itemIndex' type='integer'>The 0-based index of the selected value, or -1 if no items are selected.</field>
    this.value = "";
    this.itemCount = {};
    this.itemIndex = {};
};

//#endregion
//#region Chrome.LoadPluginPermissionRequest
chrome.LoadPluginPermissionRequest = function () {
    /// <field name='identifier' type='string'>The plugin's identifier string.</field>
    /// <field name='name' type='string'>The plugin's display name.</field>
    this.identifier = "";
    this.name = "";
    this.allow = function () {
        /// <summary>
        /// Allow the permission request. This is the default behavior if <code>deny</code> is not called..
        /// </summary>
        //No Callback
    };

    this.deny = function () {
        /// <summary>
        /// Deny the permission request.
        /// </summary>
        //No Callback
    };

};

//#endregion
//#region Chrome.MediaPermissionRequest
chrome.MediaPermissionRequest = function () {
    /// <field name='url' type='string'>The URL of the frame requesting access to user media.</field>
    this.url = "";
    this.allow = function () {
        /// <summary>
        /// Allow the permission request.
        /// </summary>
        //No Callback
    };

    this.deny = function () {
        /// <summary>
        /// Deny the permission request. This is the default behavior if <code>allow</code> is not called.
        /// </summary>
        //No Callback
    };

};

//#endregion
//#region Chrome.MenuDetails
chrome.MenuDetails = function () {
};

//#endregion
//#region Chrome.MenuItem
chrome.MenuItem = function () {
    /// <field name='id' type='string'>String that will be passed to callbacks referencing this MenuItem.</field>
    /// <field name='label' type='string'>Text displayed in the menu for this item.</field>
    /// <field name='style' type='string'>Enum representing if this item is: check, radio, or a separator.  Radio buttons between separators are considered grouped.</field>
    /// <field name='visible' type='boolean'>Indicates this item is visible.</field>
    /// <field name='checked' type='boolean'>Indicates this item should be drawn with a check.</field>
    /// <field name='enabled' type='boolean'>Indicates this item is enabled.</field>
    this.id = "";
    this.label = "";
    this.style = "";
    this.visible = true;
    this.checked = true;
    this.enabled = true;
};

//#endregion
//#region Chrome.MenuItemDetails
chrome.MenuItemDetails = function () {
    /// <field name='hasSubmenu' type='boolean'>True if this item opens a submenu.</field>
    /// <field name='itemCount' type='integer'>The number of items in the menu.</field>
    /// <field name='itemIndex' type='integer'>The 0-based index of this menu item.</field>
    this.hasSubmenu = true;
    this.itemCount = {};
    this.itemIndex = {};
};

//#endregion
//#region Chrome.MessageSender
chrome.MessageSender = function () {
    /// <field name='tab' type=''>The ref:tabs.Tab which opened the connection, if any. This property will <strong>only</strong> be present when the connection was opened from a tab (including content scripts), and <strong>only</strong> if the receiver is an extension, not an app.</field>
    /// <field name='id' type='string'>The ID of the extension or app that opened the connection, if any.</field>
    /// <field name='url' type='string'>The URL of the page or frame that opened the connection, if any. This property will <strong>only</strong> be present when the connection was opened from a tab or content script.</field>
    /// <field name='tlsChannelId' type='string'>The TLS channel ID of the web page that opened the connection, if requested by the extension or app, and if available.</field>
    this.tab = {};
    this.id = "";
    this.url = "";
    this.tlsChannelId = "";
};

//#endregion
//#region Chrome.MostVisitedURL
chrome.MostVisitedURL = function () {
    /// <field name='url' type='string'>The most visited URL.</field>
    /// <field name='title' type='string'>The title of the page</field>
    this.url = "";
    this.title = "";
};

//#endregion
//#region Chrome.NewWindow
chrome.NewWindow = function () {
    this.attach = function (webview) {
        /// <summary>
        /// Attach the requested target page to an existing <code>webview</code> element.
        /// </summary>
        /// <param name="webview" type="object" optional="false">The <code>webview</code> element to which the target page should be attached.</param>
        //No Callback
    };

    this.discard = function () {
        /// <summary>
        /// Cancel the new window request.
        /// </summary>
        //No Callback
    };

};

//#endregion
//#region Chrome.OnClickData
chrome.OnClickData = function () {
    /// <field name='menuItemId' type=''>The ID of the menu item that was clicked.</field>
    /// <field name='parentMenuItemId' type=''>The parent ID, if any, for the item clicked.</field>
    /// <field name='mediaType' type='string'>One of 'image', 'video', or 'audio' if the context menu was activated on one of these types of elements.</field>
    /// <field name='linkUrl' type='string'>If the element is a link, the URL it points to.</field>
    /// <field name='srcUrl' type='string'>Will be present for elements with a 'src' URL.</field>
    /// <field name='pageUrl' type='string'>The URL of the page where the menu item was clicked. This property is not set if the click occured in a context where there is no current page, such as in a launcher context menu.</field>
    /// <field name='frameUrl' type='string'> The URL of the frame of the element where the context menu was clicked, if it was in a frame.</field>
    /// <field name='selectionText' type='string'>The text for the context selection, if any.</field>
    /// <field name='editable' type='boolean'>A flag indicating whether the element is editable (text input, textarea, etc.).</field>
    /// <field name='wasChecked' type='boolean'>A flag indicating the state of a checkbox or radio item before it was clicked.</field>
    /// <field name='checked' type='boolean'>A flag indicating the state of a checkbox or radio item after it is clicked.</field>
    this.menuItemId = {};
    this.parentMenuItemId = {};
    this.mediaType = "";
    this.linkUrl = "";
    this.srcUrl = "";
    this.pageUrl = "";
    this.frameUrl = "";
    this.selectionText = "";
    this.editable = true;
    this.wasChecked = true;
    this.checked = true;
};

//#endregion
//#region Chrome.PacScript
chrome.PacScript = function () {
    /// <field name='url' type='string'>URL of the PAC file to be used.</field>
    /// <field name='data' type='string'>A PAC script.</field>
    /// <field name='mandatory' type='boolean'>If true, an invalid PAC script will prevent the network stack from falling back to direct connections. Defaults to false.</field>
    this.url = "";
    this.data = "";
    this.mandatory = true;
};

//#endregion
//#region Chrome.PageStateMatcher
chrome.PageStateMatcher = function () {
    /// <field name='pageUrl' type=''>Matches if the condition of the UrlFilter are fulfilled for the top-level URL of the page.</field>
    /// <field name='css' type='array'>Matches if all of the CSS selectors in the array match displayed elements in a frame with the same origin as the page's main frame.  All selectors in this array must be <a href="http://www.w3.org/TR/selectors4/#compound">compound selectors</a> to speed up matching.  Note that listing hundreds of CSS selectors or CSS selectors that match hundreds of times per page can still slow down web sites.</field>
    /// <field name='instanceType' type='string'></field>
    this.pageUrl = {};
    this.css = {};
    this.instanceType = "";
};

//#endregion
//#region Chrome.Permissions
chrome.Permissions = function () {
    /// <field name='permissions' type='array'>List of named permissions (does not include hosts or origins).  Anything listed here must appear in the <code>optional_permissions</code> list in the manifest.</field>
    /// <field name='origins' type='array'>List of origin permissions. Anything listed here must be a subset of a host that appears in the <code>optional_permissions</code> list in the manifest. For example, if <code>http://*.example.com/</code> or <code>http://*/</code> appears in <code>optional_permissions</code>, you can request an origin of <code>http://help.example.com/</code>. Any path is ignored.</field>
    this.permissions = {};
    this.origins = {};
};

//#endregion
//#region Chrome.PointerLockPermissionRequest
chrome.PointerLockPermissionRequest = function () {
    /// <field name='userGesture' type='boolean'>Whether or not pointer lock was requested as a result of a user input gesture.</field>
    /// <field name='lastUnlockedBySelf' type='boolean'>Whether or not the requesting frame was the most recent client to hold pointer lock.</field>
    /// <field name='url' type='string'>The URL of the frame requesting pointer lock.</field>
    this.userGesture = true;
    this.lastUnlockedBySelf = true;
    this.url = "";
    this.allow = function () {
        /// <summary>
        /// Allow the permission request.
        /// </summary>
        //No Callback
    };

    this.deny = function () {
        /// <summary>
        /// Deny the permission request. This is the default behavior if <code>allow</code> is not called.
        /// </summary>
        //No Callback
    };

};

//#endregion
//#region Chrome.Port
chrome.Port = function () {
    /// <field name='name' type='string'></field>
    /// <field name='disconnect' type='function'></field>
    /// <field name='onDisconnect' type=''></field>
    /// <field name='onMessage' type=''></field>
    /// <field name='postMessage' type='function'></field>
    /// <field name='sender' type=''>This property will <b>only</b> be present on ports passed to onConnect/onConnectExternal listeners.</field>
    this.name = "";
    this.disconnect = function () {
        /// <summary> not documented </summary>
    }
    this.onDisconnect = {
        addListener: function (callback) {
            /// <summary>
            /// </summary>
            callback();
        }
    };

    this.onMessage = {
        addListener: function (callback) {
            /// <summary>
            /// </summary>
            callback();
        }
    };

    this.postMessage = function () {
        /// <summary> not documented </summary>
    }
    this.sender = {};
};

//#endregion
//#region Chrome.Process
chrome.Process = function () {
    /// <field name='id' type='integer'>Unique ID of the process provided by the browser.</field>
    /// <field name='osProcessId' type='integer'>The ID of the process, as provided by the OS.</field>
    /// <field name='type' type='string'>The type of process.</field>
    /// <field name='profile' type='string'>The profile which the process is associated with.</field>
    /// <field name='tabs' type='array'>Array of Tab IDs that have a page rendered by this process. The list will be non-empty for renderer processes only.</field>
    /// <field name='cpu' type='number'>The most recent measurement of the process CPU usage, between 0 and 100%. Only available when receiving the object as part of a callback from onUpdated or onUpdatedWithMemory.</field>
    /// <field name='network' type='number'>The most recent measurement of the process network usage, in bytes per second. Only available when receiving the object as part of a callback from onUpdated or onUpdatedWithMemory.</field>
    /// <field name='privateMemory' type='number'>The most recent measurement of the process private memory usage, in bytes. Only available when receiving the object as part of a callback from onUpdatedWithMemory or getProcessInfo with the includeMemory flag.</field>
    /// <field name='jsMemoryAllocated' type='number'>The most recent measurement of the process JavaScript allocated memory, in bytes. Only available when receiving the object as part of a callback from onUpdated or onUpdatedWithMemory.</field>
    /// <field name='jsMemoryUsed' type='number'>The most recent measurement of the process JavaScript memory used, in bytes. Only available when receiving the object as part of a callback from onUpdated or onUpdatedWithMemory.</field>
    /// <field name='sqliteMemory' type='number'>The most recent measurement of the processâ€™s SQLite memory usage, in bytes. Only available when receiving the object as part of a callback from onUpdated or onUpdatedWithMemory.</field>
    /// <field name='fps' type='number'>The most recent measurement of the process frames per second. Only available when receiving the object as part of a callback from onUpdated or onUpdatedWithMemory.</field>
    /// <field name='imageCache' type=''>The most recent information about the image cache for the process. Only available when receiving the object as part of a callback from onUpdated or onUpdatedWithMemory.</field>
    /// <field name='scriptCache' type=''>The most recent information about the script cache for the process. Only available when receiving the object as part of a callback from onUpdated or onUpdatedWithMemory.</field>
    /// <field name='cssCache' type=''>The most recent information about the CSS cache for the process. Only available when receiving the object as part of a callback from onUpdated or onUpdatedWithMemory.</field>
    this.id = {};
    this.osProcessId = {};
    this.type = "";
    this.profile = "";
    this.tabs = {};
    this.cpu = 0;
    this.network = 0;
    this.privateMemory = 0;
    this.jsMemoryAllocated = 0;
    this.jsMemoryUsed = 0;
    this.sqliteMemory = 0;
    this.fps = 0;
    this.imageCache = {};
    this.scriptCache = {};
    this.cssCache = {};
};

//#endregion
//#region Chrome.ProxyConfig
chrome.ProxyConfig = function () {
    /// <field name='rules' type=''>The proxy rules describing this configuration. Use this for 'fixed_servers' mode.</field>
    /// <field name='pacScript' type=''>The proxy auto-config (PAC) script for this configuration. Use this for 'pac_script' mode.</field>
    /// <field name='mode' type='string'>'direct' = Never use a proxy<br>'auto_detect' = Auto detect proxy settings<br>'pac_script' = Use specified PAC script<br>'fixed_servers' = Manually specify proxy servers<br>'system' = Use system proxy settings</field>
    this.rules = {};
    this.pacScript = {};
    this.mode = "";
};

//#endregion
//#region Chrome.ProxyRules
chrome.ProxyRules = function () {
    /// <field name='singleProxy' type=''>The proxy server to be used for all per-URL requests (that is http, https, and ftp).</field>
    /// <field name='proxyForHttp' type=''>The proxy server to be used for HTTP requests.</field>
    /// <field name='proxyForHttps' type=''>The proxy server to be used for HTTPS requests.</field>
    /// <field name='proxyForFtp' type=''>The proxy server to be used for FTP requests.</field>
    /// <field name='fallbackProxy' type=''>The proxy server to be used for everthing else or if any of the specific proxyFor... is not specified.</field>
    /// <field name='bypassList' type='array'>List of servers to connect to without a proxy server.</field>
    this.singleProxy = {};
    this.proxyForHttp = {};
    this.proxyForHttps = {};
    this.proxyForFtp = {};
    this.fallbackProxy = {};
    this.bypassList = {};
};

//#endregion
//#region Chrome.ProxyServer
chrome.ProxyServer = function () {
    /// <field name='scheme' type='string'>The scheme (protocol) of the proxy server itself. Defaults to 'http'.</field>
    /// <field name='host' type='string'>The URI of the proxy server. This must be an ASCII hostname (in Punycode format). IDNA is not supported, yet.</field>
    /// <field name='port' type='integer'>The port of the proxy server. Defaults to a port that depends on the scheme.</field>
    this.scheme = "";
    this.host = "";
    this.port = {};
};

//#endregion
//#region Chrome.RadioButtonDetails
chrome.RadioButtonDetails = function () {
    /// <field name='isChecked' type='boolean'>True if this radio button is checked.</field>
    /// <field name='itemCount' type='integer'>The number of radio buttons in this group.</field>
    /// <field name='itemIndex' type='integer'>The 0-based index of this radio button in this group.</field>
    this.isChecked = true;
    this.itemCount = {};
    this.itemIndex = {};
};

//#endregion
//#region Chrome.RedirectRequest
chrome.RedirectRequest = function () {
    /// <field name='instanceType' type='string'></field>
    /// <field name='redirectUrl' type='string'>Destination to where the request is redirected.</field>
    this.instanceType = "";
    this.redirectUrl = "";
};

//#endregion
//#region Chrome.RemovalOptions
chrome.RemovalOptions = function () {
    /// <field name='since' type='number'>Remove data accumulated on or after this date, represented in milliseconds since the epoch (accessible via the <code>getTime</code> method of the JavaScript <code>Date</code> object). If absent, defaults to 0 (which would remove all browsing data).</field>
    /// <field name='originTypes' type='object'>An object whose properties specify which origin types ought to be cleared. If this object isn't specified, it defaults to clearing only "unprotected" origins. Please ensure that you <em>really</em> want to remove application data before adding 'protectedWeb' or 'extensions'.</field>
    this.since = 0;
    this.originTypes = {};
};

//#endregion
//#region Chrome.RemovalOptions
chrome.RemovalOptions = function () {
    /// <field name='since' type='number'>Remove data accumulated on or after this date, represented in milliseconds since the epoch (accessible via the <code>getTime</code> method of the JavaScript <code>Date</code> object). If absent, defaults to 0 (which would remove all browsing data).</field>
    this.since = 0;
};

//#endregion
//#region Chrome.RequestFilter
chrome.RequestFilter = function () {
    /// <field name='urls' type='array'>A list of URLs or URL patterns. Requests that cannot match any of the URLs will be filtered out.</field>
    /// <field name='types' type='array'>A list of request types. Requests that cannot match any of the types will be filtered out.</field>
    /// <field name='tabId' type='integer'></field>
    /// <field name='windowId' type='integer'></field>
    this.urls = {};
    this.types = {};
    this.tabId = {};
    this.windowId = {};
};

//#endregion
//#region Chrome.RequestMatcher
chrome.RequestMatcher = function () {
    /// <field name='url' type=''>Matches if the conditions of the UrlFilter are fulfilled for the URL of the request.</field>
    /// <field name='firstPartyForCookiesUrl' type=''>Matches if the conditions of the UrlFilter are fulfilled for the 'first party' URL of the request. The 'first party' URL of a request, when present, can be different from the request's target URL, and describes what is considered 'first party' for the sake of third-party checks for cookies.</field>
    /// <field name='resourceType' type='array'>Matches if the request type of a request is contained in the list. Requests that cannot match any of the types will be filtered out.</field>
    /// <field name='contentType' type='array'>Matches if the MIME media type of a response (from the HTTP Content-Type header) is contained in the list.</field>
    /// <field name='excludeContentType' type='array'>Matches if the MIME media type of a response (from the HTTP Content-Type header) is <em>not</em> contained in the list.</field>
    /// <field name='requestHeaders' type='array'>Matches if some of the request headers is matched by one of the HeaderFilters.</field>
    /// <field name='excludeRequestHeaders' type='array'>Matches if none of the request headers is matched by any of the HeaderFilters.</field>
    /// <field name='responseHeaders' type='array'>Matches if some of the response headers is matched by one of the HeaderFilters.</field>
    /// <field name='excludeResponseHeaders' type='array'>Matches if none of the response headers is matched by any of the HeaderFilters.</field>
    /// <field name='thirdPartyForCookies' type='boolean'>If set to true, matches requests that are subject to third-party cookie policies. If set to false, matches all other requests.</field>
    /// <field name='stages' type='array'>Contains a list of strings describing stages. Allowed values are 'onBeforeRequest', 'onBeforeSendHeaders', 'onHeadersReceived', 'onAuthRequired'. If this attribute is present, then it limits the applicable stages to those listed. Note that the whole condition is only applicable in stages compatible with all attributes.</field>
    /// <field name='instanceType' type='string'></field>
    this.url = {};
    this.firstPartyForCookiesUrl = {};
    this.resourceType = {};
    this.contentType = {};
    this.excludeContentType = {};
    this.requestHeaders = {};
    this.excludeRequestHeaders = {};
    this.responseHeaders = {};
    this.excludeResponseHeaders = {};
    this.thirdPartyForCookies = true;
    this.stages = {};
    this.instanceType = "";
};

//#endregion
//#region Chrome.Resource
chrome.Resource = function () {
    /// <field name='url' type='string'>The URL of the resource.</field>
    this.url = "";
    this.getContent = function (callback) {
        /// <summary>
        /// Gets the content of the resource.
        /// </summary>
        /// <param name="callback" type="function" optional="false">A function that receives resource content when the request completes.</param>
        callback("", "");
    };

    this.setContent = function (content, commit, callback) {
        /// <summary>
        /// Sets the content of the resource.
        /// </summary>
        /// <param name="content" type="string" optional="false">New content of the resource. Only resources with the text type are currently supported.</param>
        /// <param name="commit" type="boolean" optional="false">True if the user has finished editing the resource, and the new content of the resource should be persisted; false if this is a minor change sent in progress of the user editing the resource.</param>
        /// <param name="callback" type="function" optional="true">A function called upon request completion.</param>
        callback({});
    };

};

//#endregion
//#region Chrome.ResourceIdentifier
chrome.ResourceIdentifier = function () {
    /// <field name='id' type='string'>The resource identifier for the given content type.</field>
    /// <field name='description' type='string'>A human readable description of the resource.</field>
    this.id = "";
    this.description = "";
};

//#endregion
//#region Chrome.Rule
chrome.Rule = function () {
    /// <field name='id' type='string'>Optional identifier that allows referencing this rule.</field>
    /// <field name='tags' type='array'>Tags can be used to annotate rules and perform operations on sets of rules.</field>
    /// <field name='conditions' type='array'>List of conditions that can trigger the actions.</field>
    /// <field name='actions' type='array'>List of actions that are triggered if one of the condtions is fulfilled.</field>
    /// <field name='priority' type='integer'>Optional priority of this rule. Defaults to 100.</field>
    this.id = "";
    this.tags = {};
    this.conditions = {};
    this.actions = {};
    this.priority = {};
};

//#endregion
//#region Chrome.ScriptCode
chrome.ScriptCode = function () {
};

//#endregion
//#region Chrome.Session
chrome.Session = function () {
    /// <field name='lastModified' type='integer'>The time when the window or tab was closed or modified, represented in milliseconds since the epoch.</field>
    /// <field name='tab' type=''>The ref:tabs.Tab, if this entry describes a tab. Either this or ref:Session.window will be set.</field>
    /// <field name='window' type=''>The ref:windows.Window, if this entry describes a window. Either this or ref:Session.tab will be set.</field>
    this.lastModified = {};
    this.tab = {};
    this.window = {};
};

//#endregion
//#region Chrome.ShowPageAction
chrome.ShowPageAction = function () {
    /// <field name='instanceType' type='string'></field>
    this.instanceType = "";
};

//#endregion
//#region Chrome.SliderDetails
chrome.SliderDetails = function () {
    /// <field name='stringValue' type='string'>The value of the slider as a string.</field>
    this.stringValue = "";
};

//#endregion
//#region Chrome.SocketHostPatterns
chrome.SocketHostPatterns = function () {
};

//#endregion
//#region Chrome.sockets
chrome.sockets = function () {
    /// <field name='udp' type='object'>The <code>udp</code> manifest property declares which sockets.udp operations an app can issue.</field>
    /// <field name='tcp' type='object'>The <code>tcp</code> manifest property declares which sockets.tcp operations an app can issue.</field>
    /// <field name='tcpServer' type='object'>The <code>tcpServer</code> manifest property declares which sockets.tcpServer operations an app can issue.</field>
    this.udp = {};
    this.tcp = {};
    this.tcpServer = {};
};

//#endregion
//#region Chrome.StorageArea
chrome.StorageArea = function () {
    this.get = function (keys, callback) {
        /// <summary>
        /// Gets one or more items from storage.
        /// </summary>
        /// <param name="keys" type="" optional="true">A single key to get, list of keys to get, or a dictionary specifying default values (see description of the object).  An empty list or object will return an empty result object.  Pass in <code>null</code> to get the entire contents of storage.</param>
        /// <param name="callback" type="function" optional="false">Callback with storage items, or on failure (in which case ref:runtime.lastError will be set).</param>
        callback({});
    };

    this.getBytesInUse = function (keys, callback) {
        /// <summary>
        /// Gets the amount of space (in bytes) being used by one or more items.
        /// </summary>
        /// <param name="keys" type="" optional="true">A single key or list of keys to get the total usage for. An empty list will return 0. Pass in <code>null</code> to get the total usage of all of storage.</param>
        /// <param name="callback" type="function" optional="false">Callback with the amount of space being used by storage, or on failure (in which case ref:runtime.lastError will be set).</param>
        callback({});
    };

    this.set = function (items, callback) {
        /// <summary>
        /// Sets multiple items.
        /// </summary>
        /// <param name="items" type="object" optional="false"><p>An object which gives each key/value pair to update storage with. Any other key/value pairs in storage will not be affected.</p><p>Primitive values such as numbers will serialize as expected. Values with a <code>typeof</code> <code>"object"</code> and <code>"function"</code> will typically serialize to <code>{}</code>, with the exception of <code>Array</code> (serializes as expected), <code>Date</code>, and <code>Regex</code> (serialize using their <code>String</code> representation).</p></param>
        /// <param name="callback" type="function" optional="true">Callback on success, or on failure (in which case ref:runtime.lastError will be set).</param>
        callback();
    };

    this.remove = function (keys, callback) {
        /// <summary>
        /// Removes one or more items from storage.
        /// </summary>
        /// <param name="keys" type="" optional="false">A single key or a list of keys for items to remove.</param>
        /// <param name="callback" type="function" optional="true">Callback on success, or on failure (in which case ref:runtime.lastError will be set).</param>
        callback();
    };

    this.clear = function (callback) {
        /// <summary>
        /// Removes all items from storage.
        /// </summary>
        /// <param name="callback" type="function" optional="true">Callback on success, or on failure (in which case ref:runtime.lastError will be set).</param>
        callback();
    };

};

//#endregion
//#region Chrome.StorageChange
chrome.StorageChange = function () {
    /// <field name='oldValue' type='any'>The old value of the item, if there was an old value.</field>
    /// <field name='newValue' type='any'>The new value of the item, if there is a new value.</field>
    this.oldValue = {};
    this.newValue = {};
};

//#endregion
//#region Chrome.SuggestResult
chrome.SuggestResult = function () {
    /// <field name='content' type='string'>The text that is put into the URL bar, and that is sent to the extension when the user chooses this entry.</field>
    /// <field name='description' type='string'>The text that is displayed in the URL dropdown. Can contain XML-style markup for styling. The supported tags are 'url' (for a literal URL), 'match' (for highlighting text that matched what the user's query), and 'dim' (for dim helper text). The styles can be nested, eg. <dim><match>dimmed match</match></dim>.</field>
    /// <field name='descriptionStyles' type='array'>An array of style ranges for the description, as provided by the extension.</field>
    /// <field name='descriptionStylesRaw' type='array'>An array of style ranges for the description, as provided by ToValue().</field>
    this.content = "";
    this.description = "";
    this.descriptionStyles = {};
    this.descriptionStylesRaw = {};
};

//#endregion
//#region Chrome.Tab
chrome.Tab = function () {
    /// <field name='id' type='integer'>The ID of the tab. Tab IDs are unique within a browser session. Under some circumstances a Tab may not be assigned an ID, for example when querying foreign tabs using the ref:sessions API, in which case a session ID may be present.</field>
    /// <field name='index' type='integer'>The zero-based index of the tab within its window.</field>
    /// <field name='windowId' type='integer'>The ID of the window the tab is contained within.</field>
    /// <field name='openerTabId' type='integer'>The ID of the tab that opened this tab, if any. This property is only present if the opener tab still exists.</field>
    /// <field name='selected' type='boolean'>Whether the tab is selected.</field>
    /// <field name='highlighted' type='boolean'>Whether the tab is highlighted.</field>
    /// <field name='active' type='boolean'>Whether the tab is active in its window. (Does not necessarily mean the window is focused.)</field>
    /// <field name='pinned' type='boolean'>Whether the tab is pinned.</field>
    /// <field name='url' type='string'>The URL the tab is displaying. This property is only present if the extension's manifest includes the <code>"tabs"</code> permission.</field>
    /// <field name='title' type='string'>The title of the tab. This property is only present if the extension's manifest includes the <code>"tabs"</code> permission.</field>
    /// <field name='favIconUrl' type='string'>The URL of the tab's favicon. This property is only present if the extension's manifest includes the <code>"tabs"</code> permission. It may also be an empty string if the tab is loading.</field>
    /// <field name='status' type='string'>Either <em>loading</em> or <em>complete</em>.</field>
    /// <field name='incognito' type='boolean'>Whether the tab is in an incognito window.</field>
    /// <field name='width' type='integer'>The width of the tab in pixels.</field>
    /// <field name='height' type='integer'>The height of the tab in pixels.</field>
    /// <field name='sessionId' type='string'>The session ID used to uniquely identify a Tab obtained from the ref:sessions API.</field>
    this.id = {};
    this.index = {};
    this.windowId = {};
    this.openerTabId = {};
    this.selected = true;
    this.highlighted = true;
    this.active = true;
    this.pinned = true;
    this.url = "";
    this.title = "";
    this.favIconUrl = "";
    this.status = "";
    this.incognito = true;
    this.width = {};
    this.height = {};
    this.sessionId = "";
};

//#endregion
//#region Chrome.TabDetails
chrome.TabDetails = function () {
    /// <field name='itemCount' type='integer'>The number of tabs in this group.</field>
    /// <field name='itemIndex' type='integer'>The 0-based index of this tab in this group.</field>
    this.itemCount = {};
    this.itemIndex = {};
};

//#endregion
//#region Chrome.TargetInfo
chrome.TargetInfo = function () {
    /// <field name='type' type='string'>Target type.</field>
    /// <field name='id' type='string'>Target id.</field>
    /// <field name='tabId' type='integer'>The tab id, defined if type == 'page'.</field>
    /// <field name='extensionId' type='string'>The extension id, defined if type = 'background_page'.</field>
    /// <field name='attached' type='boolean'>True if debugger is already attached.</field>
    /// <field name='title' type='string'>Target page title.</field>
    /// <field name='url' type='string'>Target URL.</field>
    /// <field name='faviconUrl' type='string'>Target favicon URL.</field>
    this.type = "";
    this.id = "";
    this.tabId = {};
    this.extensionId = "";
    this.attached = true;
    this.title = "";
    this.url = "";
    this.faviconUrl = "";
};

//#endregion
//#region Chrome.TextBoxDetails
chrome.TextBoxDetails = function () {
    /// <field name='value' type='string'>The value of the text box - the entered text.</field>
    /// <field name='isPassword' type='boolean'>True if this control contains password text whose contents should be obscured.</field>
    /// <field name='selectionStart' type='integer'>The index of the character where the selection starts, if this control contains editable text.</field>
    /// <field name='selectionEnd' type='integer'>The index of the character where the selection ends, if this control contains editable text.</field>
    this.value = "";
    this.isPassword = true;
    this.selectionStart = {};
    this.selectionEnd = {};
};

//#endregion
//#region Chrome.TreeDetails
chrome.TreeDetails = function () {
};

//#endregion
//#region Chrome.TreeItemDetails
chrome.TreeItemDetails = function () {
    /// <field name='itemDepth' type='integer'>The 0-based depth of this tree item.</field>
    /// <field name='itemCount' type='integer'>The number of items in the current depth.</field>
    /// <field name='itemIndex' type='integer'>The 0-based index of this tree item at the current tree depth.</field>
    /// <field name='childrenCount' type='integer'>The number of children of the current tree item.</field>
    /// <field name='isItemExpanded' type='boolean'>True if this if this tree item is expanded.</field>
    this.itemDepth = {};
    this.itemCount = {};
    this.itemIndex = {};
    this.childrenCount = {};
    this.isItemExpanded = true;
};

//#endregion
//#region Chrome.TtsEvent
chrome.TtsEvent = function () {
    /// <field name='type' type='string'>The type can be 'start' as soon as speech has started, 'word' when a word boundary is reached, 'sentence' when a sentence boundary is reached, 'marker' when an SSML mark element is reached, 'end' when the end of the utterance is reached, 'interrupted' when the utterance is stopped or interrupted before reaching the end, 'cancelled' when it's removed from the queue before ever being synthesized, or 'error' when any other error occurs. When pausing speech, a 'pause' event is fired if a particular utterance is paused in the middle, and 'resume' if an utterance resumes speech. Note that pause and resume events may not fire if speech is paused in-between utterances.</field>
    /// <field name='charIndex' type='number'>The index of the current character in the utterance.</field>
    /// <field name='errorMessage' type='string'>The error description, if the event type is 'error'.</field>
    /// <field name='srcId' type='number'>An ID unique to the calling function's context so that events can get routed back to the correct tts.speak call.</field>
    /// <field name='isFinalEvent' type='boolean'>True if this is the final event that will be sent to this handler.</field>
    this.type = "";
    this.charIndex = 0;
    this.errorMessage = "";
    this.srcId = 0;
    this.isFinalEvent = true;
};

//#endregion
//#region Chrome.TtsVoice
chrome.TtsVoice = function () {
    /// <field name='voiceName' type='string'>The name of the voice.</field>
    /// <field name='lang' type='string'>The language that this voice supports, in the form <em>language</em>-<em>region</em>. Examples: 'en', 'en-US', 'en-GB', 'zh-CN'.</field>
    /// <field name='gender' type='string'>This voice's gender.</field>
    /// <field name='remote' type='boolean'>If true, the synthesis engine is a remote network resource. It may be higher latency and may incur bandwidth costs.</field>
    /// <field name='extensionId' type='string'>The ID of the extension providing this voice.</field>
    /// <field name='eventTypes' type='array'>All of the callback event types that this voice is capable of sending.</field>
    this.voiceName = "";
    this.lang = "";
    this.gender = "";
    this.remote = true;
    this.extensionId = "";
    this.eventTypes = {};
};

//#endregion
//#region Chrome.UploadData
chrome.UploadData = function () {
    /// <field name='bytes' type='any'>An ArrayBuffer with a copy of the data.</field>
    /// <field name='file' type='string'>A string with the file's path and name.</field>
    this.bytes = {};
    this.file = "";
};

//#endregion
//#region Chrome.UrlFilter
chrome.UrlFilter = function () {
    /// <field name='hostContains' type='string'>Matches if the host name of the URL contains a specified string. To test whether a host name component has a prefix 'foo', use hostContains: '.foo'. This matches 'www.foobar.com' and 'foo.com', because an implicit dot is added at the beginning of the host name. Similarly, hostContains can be used to match against component suffix ('foo.') and to exactly match against components ('.foo.'). Suffix- and exact-matching for the last components need to be done separately using hostSuffix, because no implicit dot is added at the end of the host name.</field>
    /// <field name='hostEquals' type='string'>Matches if the host name of the URL is equal to a specified string.</field>
    /// <field name='hostPrefix' type='string'>Matches if the host name of the URL starts with a specified string.</field>
    /// <field name='hostSuffix' type='string'>Matches if the host name of the URL ends with a specified string.</field>
    /// <field name='pathContains' type='string'>Matches if the path segment of the URL contains a specified string.</field>
    /// <field name='pathEquals' type='string'>Matches if the path segment of the URL is equal to a specified string.</field>
    /// <field name='pathPrefix' type='string'>Matches if the path segment of the URL starts with a specified string.</field>
    /// <field name='pathSuffix' type='string'>Matches if the path segment of the URL ends with a specified string.</field>
    /// <field name='queryContains' type='string'>Matches if the query segment of the URL contains a specified string.</field>
    /// <field name='queryEquals' type='string'>Matches if the query segment of the URL is equal to a specified string.</field>
    /// <field name='queryPrefix' type='string'>Matches if the query segment of the URL starts with a specified string.</field>
    /// <field name='querySuffix' type='string'>Matches if the query segment of the URL ends with a specified string.</field>
    /// <field name='urlContains' type='string'>Matches if the URL (without fragment identifier) contains a specified string. Port numbers are stripped from the URL if they match the default port number.</field>
    /// <field name='urlEquals' type='string'>Matches if the URL (without fragment identifier) is equal to a specified string. Port numbers are stripped from the URL if they match the default port number.</field>
    /// <field name='urlMatches' type='string'>Matches if the URL (without fragment identifier) matches a specified regular expression. Port numbers are stripped from the URL if they match the default port number. The regular expressions use the <a href="http://code.google.com/p/re2/wiki/Syntax">RE2 syntax</a>.</field>
    /// <field name='originAndPathMatches' type='string'>Matches if the URL without query segment and fragment identifier matches a specified regular expression. Port numbers are stripped from the URL if they match the default port number. The regular expressions use the <a href="http://code.google.com/p/re2/wiki/Syntax">RE2 syntax</a>.</field>
    /// <field name='urlPrefix' type='string'>Matches if the URL (without fragment identifier) starts with a specified string. Port numbers are stripped from the URL if they match the default port number.</field>
    /// <field name='urlSuffix' type='string'>Matches if the URL (without fragment identifier) ends with a specified string. Port numbers are stripped from the URL if they match the default port number.</field>
    /// <field name='schemes' type='array'>Matches if the scheme of the URL is equal to any of the schemes specified in the array.</field>
    /// <field name='ports' type='array'>Matches if the port of the URL is contained in any of the specified port lists. For example <code>[80, 443, [1000, 1200]]</code> matches all requests on port 80, 443 and in the range 1000-1200.</field>
    this.hostContains = "";
    this.hostEquals = "";
    this.hostPrefix = "";
    this.hostSuffix = "";
    this.pathContains = "";
    this.pathEquals = "";
    this.pathPrefix = "";
    this.pathSuffix = "";
    this.queryContains = "";
    this.queryEquals = "";
    this.queryPrefix = "";
    this.querySuffix = "";
    this.urlContains = "";
    this.urlEquals = "";
    this.urlMatches = "";
    this.originAndPathMatches = "";
    this.urlPrefix = "";
    this.urlSuffix = "";
    this.schemes = {};
    this.ports = {};
};

//#endregion
//#region Chrome.VisitItem
chrome.VisitItem = function () {
    /// <field name='id' type='string'>The unique identifier for the item.</field>
    /// <field name='visitId' type='string'>The unique identifier for this visit.</field>
    /// <field name='visitTime' type='number'>When this visit occurred, represented in milliseconds since the epoch.</field>
    /// <field name='referringVisitId' type='string'>The visit ID of the referrer.</field>
    /// <field name='transition' type='string'>The <a href='#transition_types'>transition type</a> for this visit from its referrer.</field>
    this.id = "";
    this.visitId = "";
    this.visitTime = 0;
    this.referringVisitId = "";
    this.transition = "";
};

//#endregion
//#region Chrome.WebRequestEventInteface
chrome.WebRequestEventInteface = function () {
};

//#endregion
//#region Chrome.Window
chrome.Window = function () {
    /// <field name='id' type='integer'>The ID of the window. Window IDs are unique within a browser session. Under some circumstances a Window may not be assigned an ID, for example when querying windows using the ref:sessions API, in which case a session ID may be present.</field>
    /// <field name='focused' type='boolean'>Whether the window is currently the focused window.</field>
    /// <field name='top' type='integer'>The offset of the window from the top edge of the screen in pixels. Under some circumstances a Window may not be assigned top property, for example when querying closed windows from the ref:sessions API.</field>
    /// <field name='left' type='integer'>The offset of the window from the left edge of the screen in pixels. Under some circumstances a Window may not be assigned left property, for example when querying closed windows from the ref:sessions API.</field>
    /// <field name='width' type='integer'>The width of the window, including the frame, in pixels. Under some circumstances a Window may not be assigned width property, for example when querying closed windows from the ref:sessions API.</field>
    /// <field name='height' type='integer'>The height of the window, including the frame, in pixels. Under some circumstances a Window may not be assigned height property, for example when querying closed windows from the ref:sessions API.</field>
    /// <field name='tabs' type='array'>Array of ref:tabs.Tab objects representing the current tabs in the window.</field>
    /// <field name='incognito' type='boolean'>Whether the window is incognito.</field>
    /// <field name='type' type='string'>The type of browser window this is. Under some circumstances a Window may not be assigned type property, for example when querying closed windows from the ref:sessions API.</field>
    /// <field name='state' type='string'>The state of this browser window. Under some circumstances a Window may not be assigned state property, for example when querying closed windows from the ref:sessions API.</field>
    /// <field name='alwaysOnTop' type='boolean'>Whether the window is set to be always on top.</field>
    /// <field name='sessionId' type='string'>The session ID used to uniquely identify a Window obtained from the ref:sessions API.</field>
    this.id = {};
    this.focused = true;
    this.top = {};
    this.left = {};
    this.width = {};
    this.height = {};
    this.tabs = {};
    this.incognito = true;
    this.type = "";
    this.state = "";
    this.alwaysOnTop = true;
    this.sessionId = "";
};

//#endregion
//#endregion
//#region Chrome.app
chrome.app = {};
chrome.app.getIsInstalled = function () {
    /// <summary>
    /// TODO
    /// </summary>
    //No Callback
    return true;
};

chrome.app.installState = function (callback) {
    /// <summary>
    /// TODO
    /// </summary>
    /// <param name="callback" type="function" optional="false"></param>
    callback("");
};

chrome.app.runningState = function () {
    /// <summary>
    /// TODO
    /// </summary>
    //No Callback
    return "";
};

chrome.app.getDetails = function () {
    /// <summary>
    /// TODO
    /// </summary>
    //No Callback
    return new chrome.Details;
};

chrome.app.getDetailsForFrame = function (frame) {
    /// <summary>
    /// TODO
    /// </summary>
    /// <param name="frame" type="" optional="false">TODO</param>
    //No Callback
    return new chrome.Details;
};

//#endregion
//#region Chrome.bookmarks
chrome.bookmarks = {};
chrome.bookmarks.get = function (idOrIdList, callback) {
    /// <summary>
    /// Retrieves the specified BookmarkTreeNode(s).
    /// </summary>
    /// <param name="idOrIdList" type="" optional="false">A single string-valued id, or an array of string-valued ids</param>
    /// <param name="callback" type="function" optional="false"></param>
    callback({});
};

chrome.bookmarks.getChildren = function (id, callback) {
    /// <summary>
    /// Retrieves the children of the specified BookmarkTreeNode id.
    /// </summary>
    /// <param name="id" type="string" optional="false"></param>
    /// <param name="callback" type="function" optional="false"></param>
    callback({});
};

chrome.bookmarks.getRecent = function (numberOfItems, callback) {
    /// <summary>
    /// Retrieves the recently added bookmarks.
    /// </summary>
    /// <param name="numberOfItems" type="integer" optional="false">The maximum number of items to return.</param>
    /// <param name="callback" type="function" optional="false"></param>
    callback({});
};

chrome.bookmarks.getTree = function (callback) {
    /// <summary>
    /// Retrieves the entire Bookmarks hierarchy.
    /// </summary>
    /// <param name="callback" type="function" optional="false"></param>
    callback({});
};

chrome.bookmarks.getSubTree = function (id, callback) {
    /// <summary>
    /// Retrieves part of the Bookmarks hierarchy, starting at the specified node.
    /// </summary>
    /// <param name="id" type="string" optional="false">The ID of the root of the subtree to retrieve.</param>
    /// <param name="callback" type="function" optional="false"></param>
    callback({});
};

chrome.bookmarks.search = function (query, callback) {
    /// <summary>
    /// Searches for BookmarkTreeNodes matching the given query. Queries specified with an object produce BookmarkTreeNodes matching all specified properties.
    /// </summary>
    /// <param name="query" type="" optional="false"></param>
    /// <param name="callback" type="function" optional="false"></param>
    callback({});
};

chrome.bookmarks.create = function (bookmark, callback) {
    /// <summary>
    /// Creates a bookmark or folder under the specified parentId.  If url is NULL or missing, it will be a folder.
    /// </summary>
    /// <param name="bookmark" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="true"></param>
    callback(new chrome.BookmarkTreeNode());
};

chrome.bookmarks.move = function (id, destination, callback) {
    /// <summary>
    /// Moves the specified BookmarkTreeNode to the provided location.
    /// </summary>
    /// <param name="id" type="string" optional="false"></param>
    /// <param name="destination" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="true"></param>
    callback(new chrome.BookmarkTreeNode());
};

chrome.bookmarks.update = function (id, changes, callback) {
    /// <summary>
    /// Updates the properties of a bookmark or folder. Specify only the properties that you want to change; unspecified properties will be left unchanged.  <b>Note:</b> Currently, only 'title' and 'url' are supported.
    /// </summary>
    /// <param name="id" type="string" optional="false"></param>
    /// <param name="changes" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="true"></param>
    callback(new chrome.BookmarkTreeNode());
};

chrome.bookmarks.remove = function (id, callback) {
    /// <summary>
    /// Removes a bookmark or an empty bookmark folder.
    /// </summary>
    /// <param name="id" type="string" optional="false"></param>
    /// <param name="callback" type="function" optional="true"></param>
    callback();
};

chrome.bookmarks.removeTree = function (id, callback) {
    /// <summary>
    /// Recursively removes a bookmark folder.
    /// </summary>
    /// <param name="id" type="string" optional="false"></param>
    /// <param name="callback" type="function" optional="true"></param>
    callback();
};

chrome.bookmarks.import = function (callback) {
    /// <summary>
    /// Imports bookmarks from a chrome html bookmark file
    /// </summary>
    /// <param name="callback" type="function" optional="true"></param>
    callback();
};

chrome.bookmarks.export = function (callback) {
    /// <summary>
    /// Exports bookmarks to a chrome html bookmark file
    /// </summary>
    /// <param name="callback" type="function" optional="true"></param>
    callback();
};

//#region Chrome.bookmarks Events
chrome.bookmarks.onCreated = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a bookmark or folder is created.
        /// </summary>
        callback("", new chrome.BookmarkTreeNode());
    }
};

chrome.bookmarks.onRemoved = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a bookmark or folder is removed.  When a folder is removed recursively, a single notification is fired for the folder, and none for its contents.
        /// </summary>
        callback("", {});
    }
};

chrome.bookmarks.onChanged = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a bookmark or folder changes.  <b>Note:</b> Currently, only title and url changes trigger this.
        /// </summary>
        callback("", {});
    }
};

chrome.bookmarks.onMoved = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a bookmark or folder is moved to a different parent folder.
        /// </summary>
        callback("", {});
    }
};

chrome.bookmarks.onChildrenReordered = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when the children of a folder have changed their order due to the order being sorted in the UI.  This is not called as a result of a move().
        /// </summary>
        callback("", {});
    }
};

chrome.bookmarks.onImportBegan = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a bookmark import session is begun.  Expensive observers should ignore onCreated updates until onImportEnded is fired.  Observers should still handle other notifications immediately.
        /// </summary>
        callback();
    }
};

chrome.bookmarks.onImportEnded = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a bookmark import session is ended.
        /// </summary>
        callback();
    }
};

//#endregion
//#endregion
//#region Chrome.browserAction
chrome.browserAction = {};
chrome.browserAction.setTitle = function (details) {
    /// <summary>
    /// Sets the title of the browser action. This shows up in the tooltip.
    /// </summary>
    /// <param name="details" type="object" optional="false"></param>
    //No Callback
};

chrome.browserAction.getTitle = function (details, callback) {
    /// <summary>
    /// Gets the title of the browser action.
    /// </summary>
    /// <param name="details" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="false"></param>
    callback("");
};

chrome.browserAction.setIcon = function (details, callback) {
    /// <summary>
    /// Sets the icon for the browser action. The icon can be specified either as the path to an image file or as the pixel data from a canvas element, or as dictionary of either one of those. Either the <b>path</b> or the <b>imageData</b> property must be specified.
    /// </summary>
    /// <param name="details" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="true"></param>
    callback();
};

chrome.browserAction.setPopup = function (details) {
    /// <summary>
    /// Sets the html document to be opened as a popup when the user clicks on the browser action's icon.
    /// </summary>
    /// <param name="details" type="object" optional="false"></param>
    //No Callback
};

chrome.browserAction.getPopup = function (details, callback) {
    /// <summary>
    /// Gets the html document set as the popup for this browser action.
    /// </summary>
    /// <param name="details" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="false"></param>
    callback("");
};

chrome.browserAction.setBadgeText = function (details) {
    /// <summary>
    /// Sets the badge text for the browser action. The badge is displayed on top of the icon.
    /// </summary>
    /// <param name="details" type="object" optional="false"></param>
    //No Callback
};

chrome.browserAction.getBadgeText = function (details, callback) {
    /// <summary>
    /// Gets the badge text of the browser action. If no tab is specified, the non-tab-specific badge text is returned.
    /// </summary>
    /// <param name="details" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="false"></param>
    callback("");
};

chrome.browserAction.setBadgeBackgroundColor = function (details) {
    /// <summary>
    /// Sets the background color for the badge.
    /// </summary>
    /// <param name="details" type="object" optional="false"></param>
    //No Callback
};

chrome.browserAction.getBadgeBackgroundColor = function (details, callback) {
    /// <summary>
    /// Gets the background color of the browser action.
    /// </summary>
    /// <param name="details" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="false"></param>
    callback(new chrome.ColorArray());
};

chrome.browserAction.enable = function (tabId) {
    /// <summary>
    /// Enables the browser action for a tab. By default, browser actions are enabled.
    /// </summary>
    /// <param name="tabId" type="integer" optional="true">The id of the tab for which you want to modify the browser action.</param>
    //No Callback
};

chrome.browserAction.disable = function (tabId) {
    /// <summary>
    /// Disables the browser action for a tab.
    /// </summary>
    /// <param name="tabId" type="integer" optional="true">The id of the tab for which you want to modify the browser action.</param>
    //No Callback
};

chrome.browserAction.openPopup = function (callback) {
    /// <summary>
    /// Opens the extension popup window in the active window but does not grant tab permissions.
    /// </summary>
    /// <param name="callback" type="function" optional="false"></param>
    callback({});
};

//#region Chrome.browserAction Events
chrome.browserAction.onClicked = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a browser action icon is clicked.  This event will not fire if the browser action has a popup.
        /// </summary>
        callback(new chrome.tabs.Tab());
    }
};

//#endregion
//#endregion
//#region Chrome.browsingData
chrome.browsingData = {};
chrome.browsingData.settings = function (callback) {
    /// <summary>
    /// Reports which types of data are currently selected in the 'Clear browsing data' settings UI.  Note: some of the data types included in this API are not available in the settings UI, and some UI settings control more than one data type listed here.
    /// </summary>
    /// <param name="callback" type="function" optional="false"></param>
    callback({});
};

chrome.browsingData.remove = function (options, dataToRemove, callback) {
    /// <summary>
    /// Clears various types of browsing data stored in a user's profile.
    /// </summary>
    /// <param name="options" type="" optional="false"></param>
    /// <param name="dataToRemove" type="" optional="false">The set of data types to remove.</param>
    /// <param name="callback" type="function" optional="true">Called when deletion has completed.</param>
    callback();
};

chrome.browsingData.removeAppcache = function (options, callback) {
    /// <summary>
    /// Clears websites' appcache data.
    /// </summary>
    /// <param name="options" type="" optional="false"></param>
    /// <param name="callback" type="function" optional="true">Called when websites' appcache data has been cleared.</param>
    callback();
};

chrome.browsingData.removeCache = function (options, callback) {
    /// <summary>
    /// Clears the browser's cache.
    /// </summary>
    /// <param name="options" type="" optional="false"></param>
    /// <param name="callback" type="function" optional="true">Called when the browser's cache has been cleared.</param>
    callback();
};

chrome.browsingData.removeCookies = function (options, callback) {
    /// <summary>
    /// Clears the browser's cookies and server-bound certificates modified within a particular timeframe.
    /// </summary>
    /// <param name="options" type="" optional="false"></param>
    /// <param name="callback" type="function" optional="true">Called when the browser's cookies and server-bound certificates have been cleared.</param>
    callback();
};

chrome.browsingData.removeDownloads = function (options, callback) {
    /// <summary>
    /// Clears the browser's list of downloaded files (<em>not</em> the downloaded files themselves).
    /// </summary>
    /// <param name="options" type="" optional="false"></param>
    /// <param name="callback" type="function" optional="true">Called when the browser's list of downloaded files has been cleared.</param>
    callback();
};

chrome.browsingData.removeFileSystems = function (options, callback) {
    /// <summary>
    /// Clears websites' file system data.
    /// </summary>
    /// <param name="options" type="" optional="false"></param>
    /// <param name="callback" type="function" optional="true">Called when websites' file systems have been cleared.</param>
    callback();
};

chrome.browsingData.removeFormData = function (options, callback) {
    /// <summary>
    /// Clears the browser's stored form data (autofill).
    /// </summary>
    /// <param name="options" type="" optional="false"></param>
    /// <param name="callback" type="function" optional="true">Called when the browser's form data has been cleared.</param>
    callback();
};

chrome.browsingData.removeHistory = function (options, callback) {
    /// <summary>
    /// Clears the browser's history.
    /// </summary>
    /// <param name="options" type="" optional="false"></param>
    /// <param name="callback" type="function" optional="true">Called when the browser's history has cleared.</param>
    callback();
};

chrome.browsingData.removeIndexedDB = function (options, callback) {
    /// <summary>
    /// Clears websites' IndexedDB data.
    /// </summary>
    /// <param name="options" type="" optional="false"></param>
    /// <param name="callback" type="function" optional="true">Called when websites' IndexedDB data has been cleared.</param>
    callback();
};

chrome.browsingData.removeLocalStorage = function (options, callback) {
    /// <summary>
    /// Clears websites' local storage data.
    /// </summary>
    /// <param name="options" type="" optional="false"></param>
    /// <param name="callback" type="function" optional="true">Called when websites' local storage has been cleared.</param>
    callback();
};

chrome.browsingData.removePluginData = function (options, callback) {
    /// <summary>
    /// Clears plugins' data.
    /// </summary>
    /// <param name="options" type="" optional="false"></param>
    /// <param name="callback" type="function" optional="true">Called when plugins' data has been cleared.</param>
    callback();
};

chrome.browsingData.removePasswords = function (options, callback) {
    /// <summary>
    /// Clears the browser's stored passwords.
    /// </summary>
    /// <param name="options" type="" optional="false"></param>
    /// <param name="callback" type="function" optional="true">Called when the browser's passwords have been cleared.</param>
    callback();
};

chrome.browsingData.removeWebSQL = function (options, callback) {
    /// <summary>
    /// Clears websites' WebSQL data.
    /// </summary>
    /// <param name="options" type="" optional="false"></param>
    /// <param name="callback" type="function" optional="true">Called when websites' WebSQL databases have been cleared.</param>
    callback();
};

//#endregion
//#region Chrome.commands
chrome.commands = {};
chrome.commands.getAll = function (callback) {
    /// <summary>
    /// Returns all the registered extension commands for this extension and their shortcut (if active).
    /// </summary>
    /// <param name="callback" type="function" optional="true">Called to return the registered commands.</param>
    callback({});
};

//#region Chrome.commands Events
chrome.commands.onCommand = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a registered command is activated using a keyboard shortcut.
        /// </summary>
        callback("");
    }
};

//#endregion
//#endregion
//#region Chrome.contentSettings
chrome.contentSettings = {};
//#endregion
//#region Chrome.contextMenus
chrome.contextMenus = {};
chrome.contextMenus.create = function (createProperties, callback) {
    /// <summary>
    /// Creates a new context menu item. Note that if an error occurs during creation, you may not find out until the creation callback fires (the details will be in chrome.runtime.lastError).
    /// </summary>
    /// <param name="createProperties" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="true">Called when the item has been created in the browser. If there were any problems creating the item, details will be available in chrome.runtime.lastError.</param>
    callback();
    return {};
};

chrome.contextMenus.update = function (id, updateProperties, callback) {
    /// <summary>
    /// Updates a previously created context menu item.
    /// </summary>
    /// <param name="id" type="" optional="false">The ID of the item to update.</param>
    /// <param name="updateProperties" type="object" optional="false">The properties to update. Accepts the same values as the create function.</param>
    /// <param name="callback" type="function" optional="true">Called when the context menu has been updated.</param>
    callback();
};

chrome.contextMenus.remove = function (menuItemId, callback) {
    /// <summary>
    /// Removes a context menu item.
    /// </summary>
    /// <param name="menuItemId" type="" optional="false">The ID of the context menu item to remove.</param>
    /// <param name="callback" type="function" optional="true">Called when the context menu has been removed.</param>
    callback();
};

chrome.contextMenus.removeAll = function (callback) {
    /// <summary>
    /// Removes all context menu items added by this extension.
    /// </summary>
    /// <param name="callback" type="function" optional="true">Called when removal is complete.</param>
    callback();
};

//#region Chrome.contextMenus Events
chrome.contextMenus.onClicked = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a context menu item is clicked.
        /// </summary>
        callback(new chrome.OnClickData(), new chrome.tabs.Tab());
    }
};

//#endregion
//#endregion
//#region Chrome.cookies
chrome.cookies = {};
chrome.cookies.get = function (details, callback) {
    /// <summary>
    /// Retrieves information about a single cookie. If more than one cookie of the same name exists for the given URL, the one with the longest path will be returned. For cookies with the same path length, the cookie with the earliest creation time will be returned.
    /// </summary>
    /// <param name="details" type="object" optional="false">Details to identify the cookie being retrieved.</param>
    /// <param name="callback" type="function" optional="false"></param>
    callback(new chrome.Cookie());
};

chrome.cookies.getAll = function (details, callback) {
    /// <summary>
    /// Retrieves all cookies from a single cookie store that match the given information.  The cookies returned will be sorted, with those with the longest path first.  If multiple cookies have the same path length, those with the earliest creation time will be first.
    /// </summary>
    /// <param name="details" type="object" optional="false">Information to filter the cookies being retrieved.</param>
    /// <param name="callback" type="function" optional="false"></param>
    callback({});
};

chrome.cookies.set = function (details, callback) {
    /// <summary>
    /// Sets a cookie with the given cookie data; may overwrite equivalent cookies if they exist.
    /// </summary>
    /// <param name="details" type="object" optional="false">Details about the cookie being set.</param>
    /// <param name="callback" type="function" optional="true"></param>
    callback(new chrome.Cookie());
};

chrome.cookies.remove = function (details, callback) {
    /// <summary>
    /// Deletes a cookie by name.
    /// </summary>
    /// <param name="details" type="object" optional="false">Information to identify the cookie to remove.</param>
    /// <param name="callback" type="function" optional="true"></param>
    callback({});
};

chrome.cookies.getAllCookieStores = function (callback) {
    /// <summary>
    /// Lists all existing cookie stores.
    /// </summary>
    /// <param name="callback" type="function" optional="false"></param>
    callback({});
};

//#region Chrome.cookies Events
chrome.cookies.onChanged = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a cookie is set or removed. As a special case, note that updating a cookie's properties is implemented as a two step process: the cookie to be updated is first removed entirely, generating a notification with "cause" of "overwrite" .  Afterwards, a new cookie is written with the updated values, generating a second notification with "cause" "explicit".
        /// </summary>
        callback({});
    }
};

//#endregion
//#endregion
//#region Chrome.debugger
chrome.debugger = {};
chrome.debugger.attach = function (target, requiredVersion, callback) {
    /// <summary>
    /// Attaches debugger to the given target.
    /// </summary>
    /// <param name="target" type="" optional="false">Debugging target to which you want to attach.</param>
    /// <param name="requiredVersion" type="string" optional="false">Required debugging protocol version ("0.1"). One can only attach to the debuggee with matching major version and greater or equal minor version. List of the protocol versions can be obtained <a href='http://code.google.com/chrome/devtools/docs/remote-debugging.html'>here</a>.</param>
    /// <param name="callback" type="function" optional="true">Called once the attach operation succeeds or fails. Callback receives no arguments. If the attach fails, ref:runtime.lastError will be set to the error message.</param>
    callback();
};

chrome.debugger.detach = function (target, callback) {
    /// <summary>
    /// Detaches debugger from the given target.
    /// </summary>
    /// <param name="target" type="" optional="false">Debugging target from which you want to detach.</param>
    /// <param name="callback" type="function" optional="true">Called once the detach operation succeeds or fails. Callback receives no arguments. If the detach fails, ref:runtime.lastError will be set to the error message.</param>
    callback();
};

chrome.debugger.sendCommand = function (target, method, commandParams, callback) {
    /// <summary>
    /// Sends given command to the debugging target.
    /// </summary>
    /// <param name="target" type="" optional="false">Debugging target to which you want to send the command.</param>
    /// <param name="method" type="string" optional="false">Method name. Should be one of the methods defined by the <a href='http://code.google.com/chrome/devtools/docs/remote-debugging.html'>remote debugging protocol</a>.</param>
    /// <param name="commandParams" type="object" optional="true">JSON object with request parameters. This object must conform to the remote debugging params scheme for given method.</param>
    /// <param name="callback" type="function" optional="true">Response body. If an error occurs while posting the message, the callback will be called with no arguments and ref:runtime.lastError will be set to the error message.</param>
    callback({});
};

chrome.debugger.getTargets = function (callback) {
    /// <summary>
    /// Returns the list of available debug targets.
    /// </summary>
    /// <param name="callback" type="function" optional="false"></param>
    callback({});
};

//#region Chrome.debugger Events
chrome.debugger.onEvent = {
    addListener: function (callback) {
        /// <summary>
        /// Fired whenever debugging target issues instrumentation event.
        /// </summary>
        callback(new chrome.Debuggee(), "", {});
    }
};

chrome.debugger.onDetach = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when browser terminates debugging session for the tab. This happens when either the tab is being closed or Chrome DevTools is being invoked for the attached tab.
        /// </summary>
        callback(new chrome.Debuggee(), "");
    }
};

//#endregion
//#endregion
//#region Chrome.declarativeContent
chrome.declarativeContent = {};
//#region Chrome.declarativeContent Events
chrome.declarativeContent.onPageChanged = {
    addListener: function (callback) {
        /// <summary>
        /// </summary>
        callback();
    }
};

//#endregion
//#endregion
//#region Chrome.declarativeWebRequest
chrome.declarativeWebRequest = {};
//#region Chrome.declarativeWebRequest Events
chrome.declarativeWebRequest.onRequest = {
    addListener: function (callback) {
        /// <summary>
        /// </summary>
        callback();
    }
};

chrome.declarativeWebRequest.onMessage = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a message is sent via ref:declarativeWebRequest.SendMessageToExtension from an action of the declarative web request API.
        /// </summary>
        callback({});
    }
};

//#endregion
//#endregion
//#region Chrome.desktopCapture
chrome.desktopCapture = {};
chrome.desktopCapture.chooseDesktopMedia = function (sources, targetTab, callback) {
    /// <summary>
    /// Shows desktop media picker UI with the specified set of sources.
    /// </summary>
    /// <param name="sources" type="array" optional="false">Set of sources that should be shown to the user.</param>
    /// <param name="targetTab" type="" optional="true">Optional tab for which the stream is created. If not specified then the resulting stream can be used only by the calling extension, otherwise the stream can be used only by the specified tab. If the tab's security origin changes before this function returns, the call may fail.</param>
    /// <param name="callback" type="function" optional="false"></param>
    callback("");
    return {};
};

chrome.desktopCapture.cancelChooseDesktopMedia = function (desktopMediaRequestId) {
    /// <summary>
    /// Hides desktop media picker dialog shown by chooseDesktopMedia().
    /// </summary>
    /// <param name="desktopMediaRequestId" type="integer" optional="false">Id returned by chooseDesktopMedia()</param>
    //No Callback
};

//#endregion
//#region Chrome.events
chrome.events = {};
//#endregion
//#region Chrome.experimental.accessibility
chrome.experimental.accessibility = {};
chrome.experimental.accessibility.setAccessibilityEnabled = function (enabled) {
    /// <summary>
    /// Enables or disables the accessibility extension api. This must be set to true before event listeners or getFocusedControl will work.
    /// </summary>
    /// <param name="enabled" type="boolean" optional="false">True if accessibility support should be enabled.</param>
    //No Callback
};

chrome.experimental.accessibility.setNativeAccessibilityEnabled = function (enabled) {
    /// <summary>
    /// Enables or disables native accessibility support. Once disabled, it is up to the calling extension to provide accessibility for web contents.
    /// </summary>
    /// <param name="enabled" type="boolean" optional="false">True if native accessibility support should be enabled.</param>
    //No Callback
};

chrome.experimental.accessibility.getFocusedControl = function (callback) {
    /// <summary>
    /// Gets information about the currently focused control.
    /// </summary>
    /// <param name="callback" type="function" optional="false"></param>
    callback(new chrome.AccessibilityObject());
};

chrome.experimental.accessibility.getAlertsForTab = function (tabId, callback) {
    /// <summary>
    /// Gets alerts being shown on the given tab.
    /// </summary>
    /// <param name="tabId" type="integer" optional="false"></param>
    /// <param name="callback" type="function" optional="false"></param>
    callback({});
};

//#region Chrome.experimental.accessibility Events
chrome.experimental.accessibility.onWindowOpened = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a window is opened.
        /// </summary>
        callback(new chrome.AccessibilityObject());
    }
};

chrome.experimental.accessibility.onWindowClosed = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a window is closed.
        /// </summary>
        callback(new chrome.AccessibilityObject());
    }
};

chrome.experimental.accessibility.onControlFocused = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a control is focused.
        /// </summary>
        callback(new chrome.AccessibilityObject());
    }
};

chrome.experimental.accessibility.onControlAction = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a control's action is taken, like pressing a button or toggling a checkbox.
        /// </summary>
        callback(new chrome.AccessibilityObject());
    }
};

chrome.experimental.accessibility.onTextChanged = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when text changes in an editable text control.
        /// </summary>
        callback(new chrome.AccessibilityObject());
    }
};

chrome.experimental.accessibility.onMenuOpened = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a menu is opened.
        /// </summary>
        callback(new chrome.AccessibilityObject());
    }
};

chrome.experimental.accessibility.onMenuClosed = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a menu is closed.
        /// </summary>
        callback(new chrome.AccessibilityObject());
    }
};

chrome.experimental.accessibility.onChromeVoxLoadStateChanged = {
    addListener: function (callback) {
        /// <summary>
        /// Fired ChromeVox load state changes.
        /// </summary>
        callback(true, true);
    }
};

//#endregion
//#endregion
//#region Chrome.extension
chrome.extension = {};
chrome.extension.sendRequest = function (extensionId, request, responseCallback) {
    /// <summary>
    /// Sends a single request to other listeners within the extension. Similar to ref:runtime.connect, but only sends a single request with an optional response. The ref:onRequest event is fired in each page of the extension.
    /// </summary>
    /// <param name="extensionId" type="string" optional="true">The extension ID of the extension you want to connect to. If omitted, default is your own extension.</param>
    /// <param name="request" type="any" optional="false"></param>
    /// <param name="responseCallback" type="function" optional="true"></param>
    //No Callback
};

chrome.extension.getURL = function (path) {
    /// <summary>
    /// Converts a relative path within an extension install directory to a fully-qualified URL.
    /// </summary>
    /// <param name="path" type="string" optional="false">A path to a resource within an extension expressed relative to its install directory.</param>
    //No Callback
    return "";
};

chrome.extension.getViews = function (fetchProperties) {
    /// <summary>
    /// Returns an array of the JavaScript 'window' objects for each of the pages running inside the current extension.
    /// </summary>
    /// <param name="fetchProperties" type="object" optional="true"></param>
    //No Callback
    return {};
};

chrome.extension.getBackgroundPage = function () {
    /// <summary>
    /// Returns the JavaScript 'window' object for the background page running inside the current extension. Returns null if the extension has no background page.
    /// </summary>
    //No Callback
    return {};
};

chrome.extension.getExtensionTabs = function (windowId) {
    /// <summary>
    /// Returns an array of the JavaScript 'window' objects for each of the tabs running inside the current extension. If <code>windowId</code> is specified, returns only the 'window' objects of tabs attached to the specified window.
    /// </summary>
    /// <param name="windowId" type="integer" optional="true"></param>
    //No Callback
    return {};
};

chrome.extension.isAllowedIncognitoAccess = function (callback) {
    /// <summary>
    /// Retrieves the state of the extension's access to Incognito-mode (as determined by the user-controlled 'Allowed in Incognito' checkbox.
    /// </summary>
    /// <param name="callback" type="function" optional="false"></param>
    callback({});
};

chrome.extension.isAllowedFileSchemeAccess = function (callback) {
    /// <summary>
    /// Retrieves the state of the extension's access to the 'file://' scheme (as determined by the user-controlled 'Allow access to File URLs' checkbox.
    /// </summary>
    /// <param name="callback" type="function" optional="false"></param>
    callback({});
};

chrome.extension.setUpdateUrlData = function (data) {
    /// <summary>
    /// Sets the value of the ap CGI parameter used in the extension's update URL.  This value is ignored for extensions that are hosted in the Chrome Extension Gallery.
    /// </summary>
    /// <param name="data" type="string" optional="false"></param>
    //No Callback
};

//#region Chrome.extension Events
chrome.extension.onRequest = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a request is sent from either an extension process or a content script.
        /// </summary>
        callback({}, new chrome.runtime.MessageSender(), {});
    }
};

chrome.extension.onRequestExternal = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a request is sent from another extension.
        /// </summary>
        callback({}, new chrome.runtime.MessageSender(), {});
    }
};

//#endregion
//#endregion
//#region Chrome.fileBrowserHandler
chrome.fileBrowserHandler = {};
chrome.fileBrowserHandler.selectFile = function (selectionParams, callback) {
    /// <summary>
    /// Prompts user to select file path under which file should be saved. When the file is selected, file access permission required to use the file (read, write and create) are granted to the caller. The file will not actually get created during the function call, so function caller must ensure its existence before using it. The function has to be invoked with a user gesture.
    /// </summary>
    /// <param name="selectionParams" type="object" optional="false">Parameters that will be used while selecting the file.</param>
    /// <param name="callback" type="function" optional="false">Function called upon completion.</param>
    callback({});
};

//#region Chrome.fileBrowserHandler Events
chrome.fileBrowserHandler.onExecute = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when file system action is executed from ChromeOS file browser.
        /// </summary>
        callback("", new chrome.FileHandlerExecuteEventDetails());
    }
};

//#endregion
//#endregion
//#region Chrome.fileBrowserHandlerInternal
chrome.fileBrowserHandlerInternal = {};
chrome.fileBrowserHandlerInternal.selectFile = function (selectionParams, callback) {
    /// <summary>
    /// Prompts user to select file path under which a new file will be created. If the user selects file, the file gets created or, if it already exists, truncated. The function has to be called with user gesture.
    /// </summary>
    /// <param name="selectionParams" type="object" optional="false">Parameters that will be used to create new file.</param>
    /// <param name="callback" type="function" optional="false">Function called upon completion.</param>
    callback({});
};

//#endregion
//#region Chrome.fontSettings
chrome.fontSettings = {};
chrome.fontSettings.clearFont = function (details, callback) {
    /// <summary>
    /// Clears the font set by this extension, if any.
    /// </summary>
    /// <param name="details" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="true"></param>
    callback();
};

chrome.fontSettings.getFont = function (details, callback) {
    /// <summary>
    /// Gets the font for a given script and generic font family.
    /// </summary>
    /// <param name="details" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="true"></param>
    callback({});
};

chrome.fontSettings.setFont = function (details, callback) {
    /// <summary>
    /// Sets the font for a given script and generic font family.
    /// </summary>
    /// <param name="details" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="true"></param>
    callback();
};

chrome.fontSettings.getFontList = function (callback) {
    /// <summary>
    /// Gets a list of fonts on the system.
    /// </summary>
    /// <param name="callback" type="function" optional="false"></param>
    callback({});
};

chrome.fontSettings.clearDefaultFontSize = function (details, callback) {
    /// <summary>
    /// Clears the default font size set by this extension, if any.
    /// </summary>
    /// <param name="details" type="object" optional="true">This parameter is currently unused.</param>
    /// <param name="callback" type="function" optional="true"></param>
    callback();
};

chrome.fontSettings.getDefaultFontSize = function (details, callback) {
    /// <summary>
    /// Gets the default font size.
    /// </summary>
    /// <param name="details" type="object" optional="true">This parameter is currently unused.</param>
    /// <param name="callback" type="function" optional="true"></param>
    callback({});
};

chrome.fontSettings.setDefaultFontSize = function (details, callback) {
    /// <summary>
    /// Sets the default font size.
    /// </summary>
    /// <param name="details" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="true"></param>
    callback();
};

chrome.fontSettings.clearDefaultFixedFontSize = function (details, callback) {
    /// <summary>
    /// Clears the default fixed font size set by this extension, if any.
    /// </summary>
    /// <param name="details" type="object" optional="true">This parameter is currently unused.</param>
    /// <param name="callback" type="function" optional="true"></param>
    callback();
};

chrome.fontSettings.getDefaultFixedFontSize = function (details, callback) {
    /// <summary>
    /// Gets the default size for fixed width fonts.
    /// </summary>
    /// <param name="details" type="object" optional="true">This parameter is currently unused.</param>
    /// <param name="callback" type="function" optional="true"></param>
    callback({});
};

chrome.fontSettings.setDefaultFixedFontSize = function (details, callback) {
    /// <summary>
    /// Sets the default size for fixed width fonts.
    /// </summary>
    /// <param name="details" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="true"></param>
    callback();
};

chrome.fontSettings.clearMinimumFontSize = function (details, callback) {
    /// <summary>
    /// Clears the minimum font size set by this extension, if any.
    /// </summary>
    /// <param name="details" type="object" optional="true">This parameter is currently unused.</param>
    /// <param name="callback" type="function" optional="true"></param>
    callback();
};

chrome.fontSettings.getMinimumFontSize = function (details, callback) {
    /// <summary>
    /// Gets the minimum font size.
    /// </summary>
    /// <param name="details" type="object" optional="true">This parameter is currently unused.</param>
    /// <param name="callback" type="function" optional="true"></param>
    callback({});
};

chrome.fontSettings.setMinimumFontSize = function (details, callback) {
    /// <summary>
    /// Sets the minimum font size.
    /// </summary>
    /// <param name="details" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="true"></param>
    callback();
};

//#region Chrome.fontSettings Events
chrome.fontSettings.onFontChanged = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a font setting changes.
        /// </summary>
        callback({});
    }
};

chrome.fontSettings.onDefaultFontSizeChanged = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when the default font size setting changes.
        /// </summary>
        callback({});
    }
};

chrome.fontSettings.onDefaultFixedFontSizeChanged = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when the default fixed font size setting changes.
        /// </summary>
        callback({});
    }
};

chrome.fontSettings.onMinimumFontSizeChanged = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when the minimum font size setting changes.
        /// </summary>
        callback({});
    }
};

//#endregion
//#endregion
//#region Chrome.gcm
chrome.gcm = {};
chrome.gcm.register = function (senderIds, callback) {
    /// <summary>
    /// Registers the application with GCM. The registration ID will be returned by the <code>callback</code>. If <code>register</code> is called again with the same list of <code>senderIds</code>, the same registration ID will be returned.
    /// </summary>
    /// <param name="senderIds" type="array" optional="false">A list of server IDs that are allowed to send messages to the application. It should contain at least one and no more than 100 sender IDs.</param>
    /// <param name="callback" type="function" optional="false">Function called when registration completes. It should check ref:runtime.lastError for error when <code>registrationId</code> is empty.</param>
    callback("");
};

chrome.gcm.send = function (message, callback) {
    /// <summary>
    /// Sends a message according to its contents.
    /// </summary>
    /// <param name="message" type="object" optional="false">A message to send to the other party via GCM.</param>
    /// <param name="callback" type="function" optional="false">A function called after the message is successfully queued for sending. ref:runtime.lastError should be checked, to ensure a message was sent without problems.</param>
    callback("");
};

//#region Chrome.gcm Events
chrome.gcm.onMessage = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a message is received through GCM.
        /// </summary>
        callback({});
    }
};

chrome.gcm.onMessagesDeleted = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a GCM server had to delete messages to the application from its queue in order to manage its size. The app is expected to handle that case gracefully, e.g. by running a full sync with its server.
        /// </summary>
        callback();
    }
};

chrome.gcm.onSendError = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when it was not possible to send a message to the GCM server.
        /// </summary>
        callback({});
    }
};

//#endregion
//#endregion
//#region Chrome.history
chrome.history = {};
chrome.history.search = function (query, callback) {
    /// <summary>
    /// Searches the history for the last visit time of each page matching the query.
    /// </summary>
    /// <param name="query" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="false"></param>
    callback({});
};

chrome.history.getVisits = function (details, callback) {
    /// <summary>
    /// Retrieves information about visits to a URL.
    /// </summary>
    /// <param name="details" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="false"></param>
    callback({});
};

chrome.history.addUrl = function (details, callback) {
    /// <summary>
    /// Adds a URL to the history at the current time with a <a href='#transition_types'>transition type</a> of "link".
    /// </summary>
    /// <param name="details" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="true"></param>
    callback();
};

chrome.history.deleteUrl = function (details, callback) {
    /// <summary>
    /// Removes all occurrences of the given URL from the history.
    /// </summary>
    /// <param name="details" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="true"></param>
    callback();
};

chrome.history.deleteRange = function (range, callback) {
    /// <summary>
    /// Removes all items within the specified date range from the history.  Pages will not be removed from the history unless all visits fall within the range.
    /// </summary>
    /// <param name="range" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="false"></param>
    callback();
};

chrome.history.deleteAll = function (callback) {
    /// <summary>
    /// Deletes all items from the history.
    /// </summary>
    /// <param name="callback" type="function" optional="false"></param>
    callback();
};

//#region Chrome.history Events
chrome.history.onVisited = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a URL is visited, providing the HistoryItem data for that URL.  This event fires before the page has loaded.
        /// </summary>
        callback(new chrome.HistoryItem());
    }
};

chrome.history.onVisitRemoved = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when one or more URLs are removed from the history service.  When all visits have been removed the URL is purged from history.
        /// </summary>
        callback({});
    }
};

//#endregion
//#endregion
//#region Chrome.i18n
chrome.i18n = {};
chrome.i18n.getAcceptLanguages = function (callback) {
    /// <summary>
    /// Gets the accept-languages of the browser. This is different from the locale used by the browser; to get the locale, use <code>window.navigator.language</code>.
    /// </summary>
    /// <param name="callback" type="function" optional="false"></param>
    callback({});
};

chrome.i18n.getMessage = function (messageName, substitutions) {
    /// <summary>
    /// Gets the localized string for the specified message. If the message is missing, this method returns an empty string (''). If the format of the <code>getMessage()</code> call is wrong &mdash; for example, <em>messageName</em> is not a string or the <em>substitutions</em> array has more than 9 elements &mdash; this method returns <code>undefined</code>.
    /// </summary>
    /// <param name="messageName" type="string" optional="false">The name of the message, as specified in the <a href='i18n-messages.html'><code>messages.json</code></a> file.</param>
    /// <param name="substitutions" type="any" optional="true">Up to 9 substitution strings, if the message requires any.</param>
    //No Callback
    return "";
};

//#region Chrome.i18n Events
//#endregion
//#endregion
//#region Chrome.idle
chrome.idle = {};
chrome.idle.queryState = function (detectionIntervalInSeconds, callback) {
    /// <summary>
    /// Returns "locked" if the system is locked, "idle" if the user has not generated any input for a specified number of seconds, or "active" otherwise.
    /// </summary>
    /// <param name="detectionIntervalInSeconds" type="integer" optional="false">The system is considered idle if detectionIntervalInSeconds seconds have elapsed since the last user input detected.</param>
    /// <param name="callback" type="function" optional="false"></param>
    callback("");
};

chrome.idle.setDetectionInterval = function (intervalInSeconds) {
    /// <summary>
    /// Sets the interval, in seconds, used to determine when the system is in an idle state for onStateChanged events. The default interval is 60 seconds.
    /// </summary>
    /// <param name="intervalInSeconds" type="integer" optional="false">Threshold, in seconds, used to determine when the system is in an idle state.</param>
    //No Callback
};

//#region Chrome.idle Events
chrome.idle.onStateChanged = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when the system changes to an active, idle or locked state. The event fires with "locked" if the screen is locked or the screensaver activates, "idle" if the system is unlocked and the user has not generated any input for a specified number of seconds, and "active" when the user generates input on an idle system.
        /// </summary>
        callback("");
    }
};

//#endregion
//#endregion
//#region Chrome.infobars
chrome.infobars = {};
chrome.infobars.show = function (details, callback) {
    /// <summary>
    /// Shows an infobar in the specified tab. The infobar will be closed automatically when the tab navigates. Use window.close() to close the infobar before then.
    /// </summary>
    /// <param name="details" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="true"></param>
    callback(new chrome.windows.Window());
};

//#endregion
//#region Chrome.input.ime
chrome.input.ime = {};
chrome.input.ime.setComposition = function (parameters, callback) {
    /// <summary>
    /// Set the current composition. If this extension does not own the active IME, this fails.
    /// </summary>
    /// <param name="parameters" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="true">Called when the operation completes with a boolean indicating if the text was accepted or not. On failure, chrome.runtime.lastError is set.</param>
    callback({});
};

chrome.input.ime.clearComposition = function (parameters, callback) {
    /// <summary>
    /// Clear the current composition. If this extension does not own the active IME, this fails.
    /// </summary>
    /// <param name="parameters" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="true">Called when the operation completes with a boolean indicating if the text was accepted or not. On failure, chrome.runtime.lastError is set.</param>
    callback({});
};

chrome.input.ime.commitText = function (parameters, callback) {
    /// <summary>
    /// Commits the provided text to the current input.
    /// </summary>
    /// <param name="parameters" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="true">Called when the operation completes with a boolean indicating if the text was accepted or not. On failure, chrome.runtime.lastError is set.</param>
    callback({});
};

chrome.input.ime.sendKeyEvents = function (parameters, callback) {
    /// <summary>
    /// Sends the key events.  This function is expected to be used by virtual keyboards.  When key(s) on a virtual keyboard is pressed by a user, this function is used to propagate that event to the system.
    /// </summary>
    /// <param name="parameters" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="true">Called when the operation completes.</param>
    callback();
};

chrome.input.ime.hideInputView = function () {
    /// <summary>
    /// Hides the input view window, which is popped up automatically by system. If the input view window is already hidden, this function will do nothing.
    /// </summary>
    //No Callback
};

chrome.input.ime.setCandidateWindowProperties = function (parameters, callback) {
    /// <summary>
    /// Sets the properties of the candidate window. This fails if the extension doesn't own the active IME
    /// </summary>
    /// <param name="parameters" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="true">Called when the operation completes.</param>
    callback({});
};

chrome.input.ime.setCandidates = function (parameters, callback) {
    /// <summary>
    /// Sets the current candidate list. This fails if this extension doesn't own the active IME
    /// </summary>
    /// <param name="parameters" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="true">Called when the operation completes.</param>
    callback({});
};

chrome.input.ime.setCursorPosition = function (parameters, callback) {
    /// <summary>
    /// Set the position of the cursor in the candidate window. This is a no-op if this extension does not own the active IME.
    /// </summary>
    /// <param name="parameters" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="true">Called when the operation completes</param>
    callback({});
};

chrome.input.ime.setMenuItems = function (parameters, callback) {
    /// <summary>
    /// Adds the provided menu items to the language menu when this IME is active.
    /// </summary>
    /// <param name="parameters" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="true"></param>
    callback();
};

chrome.input.ime.updateMenuItems = function (parameters, callback) {
    /// <summary>
    /// Updates the state of the MenuItems specified
    /// </summary>
    /// <param name="parameters" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="true">Called when the operation completes</param>
    callback();
};

chrome.input.ime.deleteSurroundingText = function (parameters, callback) {
    /// <summary>
    /// Deletes the text around the caret.
    /// </summary>
    /// <param name="parameters" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="true">Called when the operation completes.</param>
    callback();
};

chrome.input.ime.keyEventHandled = function (requestId, response) {
    /// <summary>
    /// Indicates that the key event received by onKeyEvent is handled.  This should only be called if the onKeyEvent listener is asynchronous.
    /// </summary>
    /// <param name="requestId" type="string" optional="false">Request id of the event that was handled.  This should come from keyEvent.requestId</param>
    /// <param name="response" type="boolean" optional="false">True if the keystroke was handled, false if not</param>
    //No Callback
};

//#region Chrome.input.ime Events
chrome.input.ime.onActivate = {
    addListener: function (callback) {
        /// <summary>
        /// This event is sent when an IME is activated. It signals that the IME will be receiving onKeyPress events.
        /// </summary>
        callback("");
    }
};

chrome.input.ime.onDeactivated = {
    addListener: function (callback) {
        /// <summary>
        /// This event is sent when an IME is deactivated. It signals that the IME will no longer be receiving onKeyPress events.
        /// </summary>
        callback("");
    }
};

chrome.input.ime.onFocus = {
    addListener: function (callback) {
        /// <summary>
        /// This event is sent when focus enters a text box. It is sent to all extensions that are listening to this event, and enabled by the user.
        /// </summary>
        callback(new chrome.InputContext());
    }
};

chrome.input.ime.onBlur = {
    addListener: function (callback) {
        /// <summary>
        /// This event is sent when focus leaves a text box. It is sent to all extensions that are listening to this event, and enabled by the user.
        /// </summary>
        callback({});
    }
};

chrome.input.ime.onInputContextUpdate = {
    addListener: function (callback) {
        /// <summary>
        /// This event is sent when the properties of the current InputContext change, such as the the type. It is sent to all extensions that are listening to this event, and enabled by the user.
        /// </summary>
        callback(new chrome.InputContext());
    }
};

chrome.input.ime.onKeyEvent = {
    addListener: function (callback) {
        /// <summary>
        /// This event is sent if this extension owns the active IME.
        /// </summary>
        callback("", new chrome.KeyboardEvent());
    }
};

chrome.input.ime.onCandidateClicked = {
    addListener: function (callback) {
        /// <summary>
        /// This event is sent if this extension owns the active IME.
        /// </summary>
        callback("", {}, "");
    }
};

chrome.input.ime.onMenuItemActivated = {
    addListener: function (callback) {
        /// <summary>
        /// Called when the user selects a menu item
        /// </summary>
        callback("", "");
    }
};

chrome.input.ime.onSurroundingTextChanged = {
    addListener: function (callback) {
        /// <summary>
        /// Called when the editable string around caret is changed or when the caret position is moved. The text length is limited to 100 characters for each back and forth direction.
        /// </summary>
        callback("", {});
    }
};

chrome.input.ime.onReset = {
    addListener: function (callback) {
        /// <summary>
        /// This event is sent when chrome terminates ongoing text input session.
        /// </summary>
        callback("");
    }
};

//#endregion
//#endregion
//#region Chrome.management
chrome.management = {};
chrome.management.getAll = function (callback) {
    /// <summary>
    /// Returns a list of information about installed extensions and apps.
    /// </summary>
    /// <param name="callback" type="function" optional="true"></param>
    callback({});
};

chrome.management.get = function (id, callback) {
    /// <summary>
    /// Returns information about the installed extension, app, or theme that has the given ID.
    /// </summary>
    /// <param name="id" type="string" optional="false">The ID from an item of ref:ExtensionInfo.</param>
    /// <param name="callback" type="function" optional="true"></param>
    callback(new chrome.ExtensionInfo());
};

chrome.management.getPermissionWarningsById = function (id, callback) {
    /// <summary>
    /// Returns a list of <a href='permission_warnings.html'>permission warnings</a> for the given extension id.
    /// </summary>
    /// <param name="id" type="string" optional="false">The ID of an already installed extension.</param>
    /// <param name="callback" type="function" optional="true"></param>
    callback({});
};

chrome.management.getPermissionWarningsByManifest = function (manifestStr, callback) {
    /// <summary>
    /// Returns a list of <a href='permission_warnings.html'>permission warnings</a> for the given extension manifest string. Note: This function can be used without requesting the 'management' permission in the manifest.
    /// </summary>
    /// <param name="manifestStr" type="string" optional="false">Extension manifest JSON string.</param>
    /// <param name="callback" type="function" optional="true"></param>
    callback({});
};

chrome.management.setEnabled = function (id, enabled, callback) {
    /// <summary>
    /// Enables or disables an app or extension.
    /// </summary>
    /// <param name="id" type="string" optional="false">This should be the id from an item of ref:ExtensionInfo.</param>
    /// <param name="enabled" type="boolean" optional="false">Whether this item should be enabled or disabled.</param>
    /// <param name="callback" type="function" optional="true"></param>
    callback();
};

chrome.management.uninstall = function (id, options, callback) {
    /// <summary>
    /// Uninstalls a currently installed app or extension.
    /// </summary>
    /// <param name="id" type="string" optional="false">This should be the id from an item of ref:ExtensionInfo.</param>
    /// <param name="options" type="object" optional="true"></param>
    /// <param name="callback" type="function" optional="true"></param>
    callback();
};

chrome.management.uninstallSelf = function (options, callback) {
    /// <summary>
    /// Uninstalls the calling extension. Note: This function can be used without requesting the 'management' permission in the manifest.
    /// </summary>
    /// <param name="options" type="object" optional="true"></param>
    /// <param name="callback" type="function" optional="true"></param>
    callback();
};

chrome.management.launchApp = function (id, callback) {
    /// <summary>
    /// Launches an application.
    /// </summary>
    /// <param name="id" type="string" optional="false">The extension id of the application.</param>
    /// <param name="callback" type="function" optional="true"></param>
    callback();
};

//#region Chrome.management Events
chrome.management.onInstalled = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when an app or extension has been installed.
        /// </summary>
        callback(new chrome.ExtensionInfo());
    }
};

chrome.management.onUninstalled = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when an app or extension has been uninstalled.
        /// </summary>
        callback("");
    }
};

chrome.management.onEnabled = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when an app or extension has been enabled.
        /// </summary>
        callback(new chrome.ExtensionInfo());
    }
};

chrome.management.onDisabled = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when an app or extension has been disabled.
        /// </summary>
        callback(new chrome.ExtensionInfo());
    }
};

//#endregion
//#endregion
//#region Chrome.manifestTypes
chrome.manifestTypes = {};
//#endregion
//#region Chrome.omnibox
chrome.omnibox = {};
chrome.omnibox.sendSuggestions = function (requestId, suggestResults) {
    /// <summary>
    /// A callback passed to the onInputChanged event used for sending suggestions back to the browser.
    /// </summary>
    /// <param name="requestId" type="integer" optional="false"></param>
    /// <param name="suggestResults" type="array" optional="false">An array of suggest results</param>
    //No Callback
};

chrome.omnibox.setDefaultSuggestion = function (suggestion) {
    /// <summary>
    /// Sets the description and styling for the default suggestion. The default suggestion is the text that is displayed in the first suggestion row underneath the URL bar.
    /// </summary>
    /// <param name="suggestion" type="" optional="false">A partial SuggestResult object, without the 'content' parameter.</param>
    //No Callback
};

//#region Chrome.omnibox Events
chrome.omnibox.onInputStarted = {
    addListener: function (callback) {
        /// <summary>
        /// User has started a keyword input session by typing the extension's keyword. This is guaranteed to be sent exactly once per input session, and before any onInputChanged events.
        /// </summary>
        callback();
    }
};

chrome.omnibox.onInputChanged = {
    addListener: function (callback) {
        /// <summary>
        /// User has changed what is typed into the omnibox.
        /// </summary>
        callback("", {});
    }
};

chrome.omnibox.onInputEntered = {
    addListener: function (callback) {
        /// <summary>
        /// User has accepted what is typed into the omnibox.
        /// </summary>
        callback("", "");
    }
};

chrome.omnibox.onInputCancelled = {
    addListener: function (callback) {
        /// <summary>
        /// User has ended the keyword input session without accepting the input.
        /// </summary>
        callback();
    }
};

//#endregion
//#endregion
//#region Chrome.pageAction
chrome.pageAction = {};
chrome.pageAction.show = function (tabId) {
    /// <summary>
    /// Shows the page action. The page action is shown whenever the tab is selected.
    /// </summary>
    /// <param name="tabId" type="integer" optional="false">The id of the tab for which you want to modify the page action.</param>
    //No Callback
};

chrome.pageAction.hide = function (tabId) {
    /// <summary>
    /// Hides the page action.
    /// </summary>
    /// <param name="tabId" type="integer" optional="false">The id of the tab for which you want to modify the page action.</param>
    //No Callback
};

chrome.pageAction.setTitle = function (details) {
    /// <summary>
    /// Sets the title of the page action. This is displayed in a tooltip over the page action.
    /// </summary>
    /// <param name="details" type="object" optional="false"></param>
    //No Callback
};

chrome.pageAction.getTitle = function (details, callback) {
    /// <summary>
    /// Gets the title of the page action.
    /// </summary>
    /// <param name="details" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="false"></param>
    callback("");
};

chrome.pageAction.setIcon = function (details, callback) {
    /// <summary>
    /// Sets the icon for the page action. The icon can be specified either as the path to an image file or as the pixel data from a canvas element, or as dictionary of either one of those. Either the <b>path</b> or the <b>imageData</b> property must be specified.
    /// </summary>
    /// <param name="details" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="true"></param>
    callback();
};

chrome.pageAction.setPopup = function (details) {
    /// <summary>
    /// Sets the html document to be opened as a popup when the user clicks on the page action's icon.
    /// </summary>
    /// <param name="details" type="object" optional="false"></param>
    //No Callback
};

chrome.pageAction.getPopup = function (details, callback) {
    /// <summary>
    /// Gets the html document set as the popup for this page action.
    /// </summary>
    /// <param name="details" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="false"></param>
    callback("");
};

//#region Chrome.pageAction Events
chrome.pageAction.onClicked = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a page action icon is clicked.  This event will not fire if the page action has a popup.
        /// </summary>
        callback(new chrome.tabs.Tab());
    }
};

//#endregion
//#endregion
//#region Chrome.pageActions
chrome.pageActions = {};
chrome.pageActions.enableForTab = function (pageActionId, action) {
    /// <summary>
    /// Enables a page action for a particular tab+URL combination (makes its icon visible in the OmniBox when a certain URL is active in a given tab). The page action will automatically be disabled (its icon hidden) if the user navigates to a new URL or closes the tab. The action will also automatically be enabled/disabled as the user switches tabs.
    /// </summary>
    /// <param name="pageActionId" type="string" optional="false">An extension can have multiple page actions specified in the manifest, each with a unique identifier. This string identifies which page action you want to enable (and must match a page action id declared in the manifest).</param>
    /// <param name="action" type="object" optional="false">An object specifing what action should be applied to the page action. Contains the following properties:</param>
    //No Callback
};

chrome.pageActions.disableForTab = function (pageActionId, action) {
    /// <summary>
    /// Disables a page action for a particular tab+URL combination (makes its OmniBox page action icon hidden when a certain URL is active in a given tab). This can be useful to disable a page action before the user navigates away from a page containing an enabled page action.
    /// </summary>
    /// <param name="pageActionId" type="string" optional="false">An extension can have multiple page actions specified in the manifest, each with a unique identifier. This string identifies which page action you want to disable (and must match a page action id declared in the manifest).</param>
    /// <param name="action" type="object" optional="false">An object specifying what action should be applied to the page action. Contains the following properties:</param>
    //No Callback
};

//#region Chrome.pageActions Events
//#endregion
//#endregion
//#region Chrome.pageCapture
chrome.pageCapture = {};
chrome.pageCapture.saveAsMHTML = function (details, callback) {
    /// <summary>
    /// Saves the content of the tab with given id as MHTML.
    /// </summary>
    /// <param name="details" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="false">Called when the MHTML has been generated.</param>
    callback({});
};

//#endregion
//#region Chrome.permissions
chrome.permissions = {};
chrome.permissions.getAll = function (callback) {
    /// <summary>
    /// Gets the extension's current set of permissions.
    /// </summary>
    /// <param name="callback" type="function" optional="false"></param>
    callback(new chrome.Permissions());
};

chrome.permissions.contains = function (permissions, callback) {
    /// <summary>
    /// Checks if the extension has the specified permissions.
    /// </summary>
    /// <param name="permissions" type="" optional="false"></param>
    /// <param name="callback" type="function" optional="false"></param>
    callback({});
};

chrome.permissions.request = function (permissions, callback) {
    /// <summary>
    /// Requests access to the specified permissions. These permissions must be defined in the optional_permissions field of the manifest. If there are any problems requesting the permissions, ref:runtime.lastError will be set.
    /// </summary>
    /// <param name="permissions" type="" optional="false"></param>
    /// <param name="callback" type="function" optional="true"></param>
    callback({});
};

chrome.permissions.remove = function (permissions, callback) {
    /// <summary>
    /// Removes access to the specified permissions. If there are any problems removing the permissions, ref:runtime.lastError will be set.
    /// </summary>
    /// <param name="permissions" type="" optional="false"></param>
    /// <param name="callback" type="function" optional="true"></param>
    callback({});
};

//#region Chrome.permissions Events
chrome.permissions.onAdded = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when the extension acquires new permissions.
        /// </summary>
        callback(new chrome.Permissions());
    }
};

chrome.permissions.onRemoved = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when access to permissions has been removed from the extension.
        /// </summary>
        callback(new chrome.Permissions());
    }
};

//#endregion
//#endregion
//#region Chrome.privacy
chrome.privacy = {};
//#endregion
//#region Chrome.processes
chrome.processes = {};
chrome.processes.terminate = function (processId, callback) {
    /// <summary>
    /// Terminates the specified renderer process. Equivalent to visiting about:crash, but without changing the tab's URL.
    /// </summary>
    /// <param name="processId" type="integer" optional="false">The ID of the process to be terminated.</param>
    /// <param name="callback" type="function" optional="true"></param>
    callback({});
};

chrome.processes.getProcessIdForTab = function (tabId, callback) {
    /// <summary>
    /// Returns the ID of the renderer process for the specified tab.
    /// </summary>
    /// <param name="tabId" type="integer" optional="false">The ID of the tab for which the renderer process ID is to be returned.</param>
    /// <param name="callback" type="function" optional="false"></param>
    callback({});
};

chrome.processes.getProcessInfo = function (processIds, includeMemory, callback) {
    /// <summary>
    /// Retrieves the process information for each process ID specified.
    /// </summary>
    /// <param name="processIds" type="" optional="false">The list of process IDs or single process ID for which to return the process information. An empty list indicates all processes are requested.</param>
    /// <param name="includeMemory" type="boolean" optional="false">True if detailed memory usage is required. Note, collecting memory usage information incurs extra CPU usage and should only be queried for when needed.</param>
    /// <param name="callback" type="function" optional="false">Called when the processes information is collected.</param>
    callback({});
};

//#region Chrome.processes Events
chrome.processes.onUpdated = {
    addListener: function (callback) {
        /// <summary>
        /// Fired each time the Task Manager updates its process statistics, providing the dictionary of updated Process objects, indexed by process ID.
        /// </summary>
        callback({});
    }
};

chrome.processes.onUpdatedWithMemory = {
    addListener: function (callback) {
        /// <summary>
        /// Fired each time the Task Manager updates its process statistics, providing the dictionary of updated Process objects, indexed by process ID. Identical to onUpdate, with the addition of memory usage details included in each Process object. Note, collecting memory usage information incurs extra CPU usage and should only be listened for when needed.
        /// </summary>
        callback({});
    }
};

chrome.processes.onCreated = {
    addListener: function (callback) {
        /// <summary>
        /// Fired each time a process is created, providing the corrseponding Process object.
        /// </summary>
        callback(new chrome.Process());
    }
};

chrome.processes.onUnresponsive = {
    addListener: function (callback) {
        /// <summary>
        /// Fired each time a process becomes unresponsive, providing the corrseponding Process object.
        /// </summary>
        callback(new chrome.Process());
    }
};

chrome.processes.onExited = {
    addListener: function (callback) {
        /// <summary>
        /// Fired each time a process is terminated, providing the type of exit.
        /// </summary>
        callback({}, {}, {});
    }
};

//#endregion
//#endregion
//#region Chrome.proxy
chrome.proxy = {};
//#region Chrome.proxy Events
chrome.proxy.onProxyError = {
    addListener: function (callback) {
        /// <summary>
        /// Notifies about proxy errors.
        /// </summary>
        callback({});
    }
};

//#endregion
//#endregion
//#region Chrome.runtime
chrome.runtime = {};
chrome.runtime.getBackgroundPage = function (callback) {
    /// <summary>
    /// Retrieves the JavaScript 'window' object for the background page running inside the current extension/app. If the background page is an event page, the system will ensure it is loaded before calling the callback. If there is no background page, an error is set.
    /// </summary>
    /// <param name="callback" type="function" optional="false"></param>
    callback({});
};

chrome.runtime.getManifest = function () {
    /// <summary>
    /// Returns details about the app or extension from the manifest. The object returned is a serialization of the full <a href="manifest.html">manifest file</a>.
    /// </summary>
    //No Callback
    return {};
};

chrome.runtime.getURL = function (path) {
    /// <summary>
    /// Converts a relative path within an app/extension install directory to a fully-qualified URL.
    /// </summary>
    /// <param name="path" type="string" optional="false">A path to a resource within an app/extension expressed relative to its install directory.</param>
    //No Callback
    return "";
};

chrome.runtime.setUninstallURL = function (url) {
    /// <summary>
    /// Sets the URL to be visited upon uninstallation. This may be used to clean up server-side data, do analytics, and implement surveys. Maximum 255 characters.
    /// </summary>
    /// <param name="url" type="string" optional="false"></param>
    //No Callback
};

chrome.runtime.reload = function () {
    /// <summary>
    /// Reloads the app or extension.
    /// </summary>
    //No Callback
};

chrome.runtime.requestUpdateCheck = function (callback) {
    /// <summary>
    /// Requests an update check for this app/extension.
    /// </summary>
    /// <param name="callback" type="function" optional="false"></param>
    callback("", {});
};

chrome.runtime.restart = function () {
    /// <summary>
    /// Restart the ChromeOS device when the app runs in kiosk mode. Otherwise, it's no-op.
    /// </summary>
    //No Callback
};

chrome.runtime.connect = function (extensionId, connectInfo) {
    /// <summary>
    /// Attempts to connect to other listeners within the extension/app (such as the background page), or other extensions/apps. This is useful for content scripts connecting to their extension processes. Note that this does not connect to any listeners in a content script. Extensions may connect to content scripts embedded in tabs via ref:tabs.connect.
    /// </summary>
    /// <param name="extensionId" type="string" optional="true">The ID of the extension/app you want to connect to. If omitted, default is your own extension.</param>
    /// <param name="connectInfo" type="object" optional="true"></param>
    //No Callback
    return new chrome.Port;
};

chrome.runtime.connectNative = function (application) {
    /// <summary>
    /// Connects to a native application in the host machine.
    /// </summary>
    /// <param name="application" type="string" optional="false">The name of the registered application to connect to.</param>
    //No Callback
    return new chrome.Port;
};

chrome.runtime.sendMessage = function (extensionId, message, options, responseCallback) {
    /// <summary>
    /// Sends a single message to onMessage event listeners within the extension (or another extension/app). Similar to chrome.runtime.connect, but only sends a single message with an optional response. The ref:runtime.onMessage event is fired in each extension page of the extension. Note that extensions cannot send messages to content scripts using this method. To send messages to content scripts, use ref:tabs.sendMessage.
    /// </summary>
    /// <param name="extensionId" type="string" optional="true">The extension ID of the extension you want to connect to. If omitted, default is your own extension.</param>
    /// <param name="message" type="any" optional="false"></param>
    /// <param name="options" type="object" optional="true"></param>
    /// <param name="responseCallback" type="function" optional="true"></param>
    //No Callback
};

chrome.runtime.sendNativeMessage = function (application, message, responseCallback) {
    /// <summary>
    /// Send a single message to a native application.
    /// </summary>
    /// <param name="application" type="string" optional="false">The name of the native messaging host.</param>
    /// <param name="message" type="object" optional="false">The message that will be passed to the native messaging host.</param>
    /// <param name="responseCallback" type="function" optional="true"></param>
    //No Callback
};

chrome.runtime.getPlatformInfo = function (callback) {
    /// <summary>
    /// Returns information about the current platform.
    /// </summary>
    /// <param name="callback" type="function" optional="false">Called with results</param>
    callback({});
};

chrome.runtime.getPackageDirectoryEntry = function (callback) {
    /// <summary>
    /// Returns a DirectoryEntry for the package directory.
    /// </summary>
    /// <param name="callback" type="function" optional="false"></param>
    callback({});
};

//#region Chrome.runtime Events
chrome.runtime.onStartup = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a profile that has this extension installed first starts up. This event is not fired when an incognito profile is started, even if this extension is operating in 'split' incognito mode.
        /// </summary>
        callback();
    }
};

chrome.runtime.onInstalled = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when the extension is first installed, when the extension is updated to a new version, and when Chrome is updated to a new version.
        /// </summary>
        callback({});
    }
};

chrome.runtime.onSuspend = {
    addListener: function (callback) {
        /// <summary>
        /// Sent to the event page just before it is unloaded. This gives the extension opportunity to do some clean up. Note that since the page is unloading, any asynchronous operations started while handling this event are not guaranteed to complete. If more activity for the event page occurs before it gets unloaded the onSuspendCanceled event will be sent and the page won't be unloaded. 
        /// </summary>
        callback();
    }
};

chrome.runtime.onSuspendCanceled = {
    addListener: function (callback) {
        /// <summary>
        /// Sent after onSuspend to indicate that the app won't be unloaded after all.
        /// </summary>
        callback();
    }
};

chrome.runtime.onUpdateAvailable = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when an update is available, but isn't installed immediately because the app is currently running. If you do nothing, the update will be installed the next time the background page gets unloaded, if you want it to be installed sooner you can explicitly call chrome.runtime.reload().
        /// </summary>
        callback({});
    }
};

chrome.runtime.onBrowserUpdateAvailable = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a Chrome update is available, but isn't installed immediately because a browser restart is required.
        /// </summary>
        callback();
    }
};

chrome.runtime.onConnect = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a connection is made from either an extension process or a content script.
        /// </summary>
        callback(new chrome.Port());
    }
};

chrome.runtime.onConnectExternal = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a connection is made from another extension.
        /// </summary>
        callback(new chrome.Port());
    }
};

chrome.runtime.onMessage = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a message is sent from either an extension process or a content script.
        /// </summary>
        callback({}, new chrome.MessageSender(), {});
    }
};

chrome.runtime.onMessageExternal = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a message is sent from another extension/app. Cannot be used in a content script.
        /// </summary>
        callback({}, new chrome.MessageSender(), {});
    }
};

chrome.runtime.onRestartRequired = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when an app or the device that it runs on needs to be restarted. The app should close all its windows at its earliest convenient time to let the restart to happen. If the app does nothing, a restart will be enforced after a 24-hour grace period has passed. Currently, this event is only fired for Chrome OS kiosk apps.
        /// </summary>
        callback("");
    }
};

//#endregion
//#endregion
//#region Chrome.scriptBadge
chrome.scriptBadge = {};
chrome.scriptBadge.setPopup = function (details) {
    /// <summary>
    /// Sets the html document to be opened as a popup when the user clicks on the script badge's icon.
    /// </summary>
    /// <param name="details" type="object" optional="false"></param>
    //No Callback
};

chrome.scriptBadge.getPopup = function (details, callback) {
    /// <summary>
    /// Gets the html document set as the popup for this script badge.
    /// </summary>
    /// <param name="details" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="false"></param>
    callback("");
};

chrome.scriptBadge.getAttention = function (details) {
    /// <summary>
    /// Brings the script badge to the attention of the user, imploring her to click.  You should call this when you detect that you can do something to a particular tab.  Do not call this for every tab. That's tacky.  If the user clicks on the badge, the activeTab APIs become available. If the extension has already run on this tab, this call does nothing.
    /// </summary>
    /// <param name="details" type="object" optional="false"></param>
    //No Callback
};

//#region Chrome.scriptBadge Events
chrome.scriptBadge.onClicked = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a script badge icon is clicked.  This event will not fire if the script badge has a popup.
        /// </summary>
        callback(new chrome.tabs.Tab());
    }
};

//#endregion
//#endregion
//#region Chrome.sessions
chrome.sessions = {};
chrome.sessions.getRecentlyClosed = function (filter, callback) {
    /// <summary>
    /// Gets the list of recently closed tabs and/or windows.
    /// </summary>
    /// <param name="filter" type="" optional="true"></param>
    /// <param name="callback" type="function" optional="false"></param>
    callback({});
};

chrome.sessions.getDevices = function (filter, callback) {
    /// <summary>
    /// Retrieves all devices with synced sessions.
    /// </summary>
    /// <param name="filter" type="" optional="true"></param>
    /// <param name="callback" type="function" optional="false"></param>
    callback({});
};

chrome.sessions.restore = function (sessionId, callback) {
    /// <summary>
    /// Reopens a ref:windows.Window or ref:tabs.Tab, with an optional callback to run when the entry has been restored.
    /// </summary>
    /// <param name="sessionId" type="string" optional="true">The ref:windows.Window.sessionId, or ref:tabs.Tab.sessionId to restore.</param>
    /// <param name="callback" type="function" optional="true"></param>
    callback(new chrome.Session());
};

//#endregion
//#region Chrome.storage
chrome.storage = {};
//#region Chrome.storage Events
chrome.storage.onChanged = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when one or more items change.
        /// </summary>
        callback({}, "");
    }
};

//#endregion
//#region Chrome.storage Properties
chrome.storage.sync = new chrome.StorageArea();
chrome.storage.local = new chrome.StorageArea();
chrome.storage.managed = new chrome.StorageArea();

//#endregion
//#endregion
//#region Chrome.tabs
chrome.tabs = {};
chrome.tabs.get = function (tabId, callback) {
    /// <summary>
    /// Retrieves details about the specified tab.
    /// </summary>
    /// <param name="tabId" type="integer" optional="false"></param>
    /// <param name="callback" type="function" optional="false"></param>
    callback(new chrome.Tab());
};

chrome.tabs.getCurrent = function (callback) {
    /// <summary>
    /// Gets the tab that this script call is being made from. May be undefined if called from a non-tab context (for example: a background page or popup view).
    /// </summary>
    /// <param name="callback" type="function" optional="false"></param>
    callback(new chrome.Tab());
};

chrome.tabs.connect = function (tabId, connectInfo) {
    /// <summary>
    /// Connects to the content script(s) in the specified tab. The ref:runtime.onConnect event is fired in each content script running in the specified tab for the current extension. For more details, see <a href='messaging.html'>Content Script Messaging</a>.
    /// </summary>
    /// <param name="tabId" type="integer" optional="false"></param>
    /// <param name="connectInfo" type="object" optional="true"></param>
    //No Callback
    return new chrome.runtime.Port;
};

chrome.tabs.sendRequest = function (tabId, request, responseCallback) {
    /// <summary>
    /// Sends a single request to the content script(s) in the specified tab, with an optional callback to run when a response is sent back.  The ref:extension.onRequest event is fired in each content script running in the specified tab for the current extension.
    /// </summary>
    /// <param name="tabId" type="integer" optional="false"></param>
    /// <param name="request" type="any" optional="false"></param>
    /// <param name="responseCallback" type="function" optional="true"></param>
    //No Callback
};

chrome.tabs.sendMessage = function (tabId, message, responseCallback) {
    /// <summary>
    /// Sends a single message to the content script(s) in the specified tab, with an optional callback to run when a response is sent back.  The ref:runtime.onMessage event is fired in each content script running in the specified tab for the current extension.
    /// </summary>
    /// <param name="tabId" type="integer" optional="false"></param>
    /// <param name="message" type="any" optional="false"></param>
    /// <param name="responseCallback" type="function" optional="true"></param>
    //No Callback
};

chrome.tabs.getSelected = function (windowId, callback) {
    /// <summary>
    /// Gets the tab that is selected in the specified window.
    /// </summary>
    /// <param name="windowId" type="integer" optional="true">Defaults to the <a href='windows.html#current-window'>current window</a>.</param>
    /// <param name="callback" type="function" optional="false"></param>
    callback(new chrome.Tab());
};

chrome.tabs.getAllInWindow = function (windowId, callback) {
    /// <summary>
    /// Gets details about all tabs in the specified window.
    /// </summary>
    /// <param name="windowId" type="integer" optional="true">Defaults to the <a href='windows.html#current-window'>current window</a>.</param>
    /// <param name="callback" type="function" optional="false"></param>
    callback({});
};

chrome.tabs.create = function (createProperties, callback) {
    /// <summary>
    /// Creates a new tab.
    /// </summary>
    /// <param name="createProperties" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="true"></param>
    callback(new chrome.Tab());
};

chrome.tabs.duplicate = function (tabId, callback) {
    /// <summary>
    /// Duplicates a tab.
    /// </summary>
    /// <param name="tabId" type="integer" optional="false">The ID of the tab which is to be duplicated.</param>
    /// <param name="callback" type="function" optional="true"></param>
    callback(new chrome.Tab());
};

chrome.tabs.query = function (queryInfo, callback) {
    /// <summary>
    /// Gets all tabs that have the specified properties, or all tabs if no properties are specified.
    /// </summary>
    /// <param name="queryInfo" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="false"></param>
    callback({});
};

chrome.tabs.highlight = function (highlightInfo, callback) {
    /// <summary>
    /// Highlights the given tabs.
    /// </summary>
    /// <param name="highlightInfo" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="false"></param>
    callback(new chrome.windows.Window());
};

chrome.tabs.update = function (tabId, updateProperties, callback) {
    /// <summary>
    /// Modifies the properties of a tab. Properties that are not specified in <var>updateProperties</var> are not modified.
    /// </summary>
    /// <param name="tabId" type="integer" optional="true">Defaults to the selected tab of the <a href='windows.html#current-window'>current window</a>.</param>
    /// <param name="updateProperties" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="true"></param>
    callback(new chrome.Tab());
};

chrome.tabs.move = function (tabIds, moveProperties, callback) {
    /// <summary>
    /// Moves one or more tabs to a new position within its window, or to a new window. Note that tabs can only be moved to and from normal (window.type === "normal") windows.
    /// </summary>
    /// <param name="tabIds" type="" optional="false">The tab or list of tabs to move.</param>
    /// <param name="moveProperties" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="true"></param>
    callback({});
};

chrome.tabs.reload = function (tabId, reloadProperties, callback) {
    /// <summary>
    /// Reload a tab.
    /// </summary>
    /// <param name="tabId" type="integer" optional="true">The ID of the tab to reload; defaults to the selected tab of the current window.</param>
    /// <param name="reloadProperties" type="object" optional="true"></param>
    /// <param name="callback" type="function" optional="true"></param>
    callback();
};

chrome.tabs.remove = function (tabIds, callback) {
    /// <summary>
    /// Closes one or more tabs.
    /// </summary>
    /// <param name="tabIds" type="" optional="false">The tab or list of tabs to close.</param>
    /// <param name="callback" type="function" optional="true"></param>
    callback();
};

chrome.tabs.detectLanguage = function (tabId, callback) {
    /// <summary>
    /// Detects the primary language of the content in a tab.
    /// </summary>
    /// <param name="tabId" type="integer" optional="true">Defaults to the active tab of the <a href='windows.html#current-window'>current window</a>.</param>
    /// <param name="callback" type="function" optional="false"></param>
    callback("");
};

chrome.tabs.captureVisibleTab = function (windowId, options, callback) {
    /// <summary>
    /// Captures the visible area of the currently active tab in the specified window. You must have <a href='declare_permissions.html'>host permission</a> for the URL displayed by the tab.
    /// </summary>
    /// <param name="windowId" type="integer" optional="true">The target window. Defaults to the <a href='windows.html#current-window'>current window</a>.</param>
    /// <param name="options" type="" optional="true"></param>
    /// <param name="callback" type="function" optional="false"></param>
    callback("");
};

chrome.tabs.executeScript = function (tabId, details, callback) {
    /// <summary>
    /// Injects JavaScript code into a page. For details, see the <a href='content_scripts.html#pi'>programmatic injection</a> section of the content scripts doc.
    /// </summary>
    /// <param name="tabId" type="integer" optional="true">The ID of the tab in which to run the script; defaults to the active tab of the current window.</param>
    /// <param name="details" type="" optional="false">Details of the script to run.</param>
    /// <param name="callback" type="function" optional="true">Called after all the JavaScript has been executed.</param>
    callback({});
};

chrome.tabs.insertCSS = function (tabId, details, callback) {
    /// <summary>
    /// Injects CSS into a page. For details, see the <a href='content_scripts.html#pi'>programmatic injection</a> section of the content scripts doc.
    /// </summary>
    /// <param name="tabId" type="integer" optional="true">The ID of the tab in which to insert the CSS; defaults to the active tab of the current window.</param>
    /// <param name="details" type="" optional="false">Details of the CSS text to insert.</param>
    /// <param name="callback" type="function" optional="true">Called when all the CSS has been inserted.</param>
    callback();
};

//#region Chrome.tabs Events
chrome.tabs.onCreated = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a tab is created. Note that the tab's URL may not be set at the time this event fired, but you can listen to onUpdated events to be notified when a URL is set.
        /// </summary>
        callback(new chrome.Tab());
    }
};

chrome.tabs.onUpdated = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a tab is updated.
        /// </summary>
        callback({}, {}, new chrome.Tab());
    }
};

chrome.tabs.onMoved = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a tab is moved within a window. Only one move event is fired, representing the tab the user directly moved. Move events are not fired for the other tabs that must move in response. This event is not fired when a tab is moved between windows. For that, see ref:onDetached.
        /// </summary>
        callback({}, {});
    }
};

chrome.tabs.onSelectionChanged = {
    addListener: function (callback) {
        /// <summary>
        /// Fires when the selected tab in a window changes.
        /// </summary>
        callback({}, {});
    }
};

chrome.tabs.onActiveChanged = {
    addListener: function (callback) {
        /// <summary>
        /// Fires when the selected tab in a window changes. Note that the tab's URL may not be set at the time this event fired, but you can listen to ref:onUpdated events to be notified when a URL is set.
        /// </summary>
        callback({}, {});
    }
};

chrome.tabs.onActivated = {
    addListener: function (callback) {
        /// <summary>
        /// Fires when the active tab in a window changes. Note that the tab's URL may not be set at the time this event fired, but you can listen to onUpdated events to be notified when a URL is set.
        /// </summary>
        callback({});
    }
};

chrome.tabs.onHighlightChanged = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when the highlighted or selected tabs in a window changes.
        /// </summary>
        callback({});
    }
};

chrome.tabs.onHighlighted = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when the highlighted or selected tabs in a window changes.
        /// </summary>
        callback({});
    }
};

chrome.tabs.onDetached = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a tab is detached from a window, for example because it is being moved between windows.
        /// </summary>
        callback({}, {});
    }
};

chrome.tabs.onAttached = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a tab is attached to a window, for example because it was moved between windows.
        /// </summary>
        callback({}, {});
    }
};

chrome.tabs.onRemoved = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a tab is closed.
        /// </summary>
        callback({}, {});
    }
};

chrome.tabs.onReplaced = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a tab is replaced with another tab due to prerendering or instant.
        /// </summary>
        callback({}, {});
    }
};

//#endregion
//#endregion
//#region Chrome.test
chrome.test = {};
chrome.test.getConfig = function (callback) {
    /// <summary>
    /// Gives configuration options set by the test.
    /// </summary>
    /// <param name="callback" type="function" optional="false"></param>
    callback({});
};

chrome.test.notifyFail = function (message) {
    /// <summary>
    /// Notifies the browser process that test code running in the extension failed.  This is only used for internal unit testing.
    /// </summary>
    /// <param name="message" type="string" optional="false"></param>
    //No Callback
};

chrome.test.notifyPass = function (message) {
    /// <summary>
    /// Notifies the browser process that test code running in the extension passed.  This is only used for internal unit testing.
    /// </summary>
    /// <param name="message" type="string" optional="true"></param>
    //No Callback
};

chrome.test.resetQuota = function () {
    /// <summary>
    /// Resets all accumulated quota state for all extensions.  This is only used for internal unit testing.
    /// </summary>
    //No Callback
};

chrome.test.log = function (message) {
    /// <summary>
    /// Logs a message during internal unit testing.
    /// </summary>
    /// <param name="message" type="string" optional="false"></param>
    //No Callback
};

chrome.test.createIncognitoTab = function (url) {
    /// <summary>
    /// Creates an incognito tab during internal testing. Succeeds even if the extension is not enabled in incognito mode.
    /// </summary>
    /// <param name="url" type="string" optional="false"></param>
    //No Callback
};

chrome.test.sendMessage = function (message, callback) {
    /// <summary>
    /// Sends a string message to the browser process, generating a Notification that C++ test code can wait for.
    /// </summary>
    /// <param name="message" type="string" optional="false"></param>
    /// <param name="callback" type="function" optional="true"></param>
    callback("");
};

chrome.test.callbackAdded = function () {
    /// <summary>
    /// </summary>
    //No Callback
};

chrome.test.runNextTest = function () {
    /// <summary>
    /// </summary>
    //No Callback
};

chrome.test.fail = function (message) {
    /// <summary>
    /// </summary>
    /// <param name="message" type="any" optional="true"></param>
    //No Callback
};

chrome.test.succeed = function (message) {
    /// <summary>
    /// </summary>
    /// <param name="message" type="any" optional="true"></param>
    //No Callback
};

chrome.test.assertTrue = function (test, message) {
    /// <summary>
    /// </summary>
    /// <param name="test" type="" optional="false"></param>
    /// <param name="message" type="string" optional="true"></param>
    //No Callback
};

chrome.test.assertFalse = function (test, message) {
    /// <summary>
    /// </summary>
    /// <param name="test" type="" optional="false"></param>
    /// <param name="message" type="string" optional="true"></param>
    //No Callback
};

chrome.test.assertBool = function (test, expected, message) {
    /// <summary>
    /// </summary>
    /// <param name="test" type="" optional="false"></param>
    /// <param name="expected" type="boolean" optional="false"></param>
    /// <param name="message" type="string" optional="true"></param>
    //No Callback
};

chrome.test.checkDeepEq = function (expected, actual) {
    /// <summary>
    /// </summary>
    /// <param name="expected" type="any" optional="true"></param>
    /// <param name="actual" type="any" optional="true"></param>
    //No Callback
};

chrome.test.assertEq = function (expected, actual, message) {
    /// <summary>
    /// </summary>
    /// <param name="expected" type="any" optional="true"></param>
    /// <param name="actual" type="any" optional="true"></param>
    /// <param name="message" type="string" optional="true"></param>
    //No Callback
};

chrome.test.assertNoLastError = function () {
    /// <summary>
    /// </summary>
    //No Callback
};

chrome.test.assertLastError = function (expectedError) {
    /// <summary>
    /// </summary>
    /// <param name="expectedError" type="string" optional="false"></param>
    //No Callback
};

chrome.test.assertThrows = function (fn, self, args, message) {
    /// <summary>
    /// </summary>
    /// <param name="fn" type="function" optional="false"></param>
    /// <param name="self" type="object" optional="true"></param>
    /// <param name="args" type="array" optional="false"></param>
    /// <param name="message" type="" optional="true"></param>
    //No Callback
};

chrome.test.callback = function (func, expectedError) {
    /// <summary>
    /// </summary>
    /// <param name="func" type="function" optional="true"></param>
    /// <param name="expectedError" type="string" optional="true"></param>
    //No Callback
};

chrome.test.listenOnce = function (event, func) {
    /// <summary>
    /// </summary>
    /// <param name="event" type="any" optional="false"></param>
    /// <param name="func" type="function" optional="false"></param>
    //No Callback
};

chrome.test.listenForever = function (event, func) {
    /// <summary>
    /// </summary>
    /// <param name="event" type="any" optional="false"></param>
    /// <param name="func" type="function" optional="false"></param>
    //No Callback
};

chrome.test.callbackPass = function (func) {
    /// <summary>
    /// </summary>
    /// <param name="func" type="function" optional="true"></param>
    //No Callback
};

chrome.test.callbackFail = function (expectedError, func) {
    /// <summary>
    /// </summary>
    /// <param name="expectedError" type="string" optional="false"></param>
    /// <param name="func" type="function" optional="true"></param>
    //No Callback
};

chrome.test.runTests = function (tests) {
    /// <summary>
    /// </summary>
    /// <param name="tests" type="array" optional="false"></param>
    //No Callback
};

chrome.test.getApiFeatures = function () {
    /// <summary>
    /// </summary>
    //No Callback
};

chrome.test.getApiDefinitions = function (apiNames) {
    /// <summary>
    /// </summary>
    /// <param name="apiNames" type="array" optional="true"></param>
    //No Callback
};

chrome.test.isProcessingUserGesture = function () {
    /// <summary>
    /// </summary>
    //No Callback
};

chrome.test.runWithUserGesture = function (callback) {
    /// <summary>
    /// Runs the callback in the context of a user gesture.
    /// </summary>
    /// <param name="callback" type="function" optional="false"></param>
    callback();
};

chrome.test.runWithoutUserGesture = function (callback) {
    /// <summary>
    /// </summary>
    /// <param name="callback" type="function" optional="false"></param>
    callback();
};

//#region Chrome.test Events
chrome.test.onMessage = {
    addListener: function (callback) {
        /// <summary>
        /// Used to test sending messages to extensions.
        /// </summary>
        callback({});
    }
};

//#endregion
//#endregion
//#region Chrome.topSites
chrome.topSites = {};
chrome.topSites.get = function (callback) {
    /// <summary>
    /// Gets a list of top sites.
    /// </summary>
    /// <param name="callback" type="function" optional="false"></param>
    callback({});
};

//#endregion
//#region Chrome.tts
chrome.tts = {};
chrome.tts.speak = function (utterance, options, callback) {
    /// <summary>
    /// Speaks text using a text-to-speech engine.
    /// </summary>
    /// <param name="utterance" type="string" optional="false">The text to speak, either plain text or a complete, well-formed SSML document. Speech engines that do not support SSML will strip away the tags and speak the text. The maximum length of the text is 32,768 characters.</param>
    /// <param name="options" type="object" optional="true">The speech options.</param>
    /// <param name="callback" type="function" optional="true">Called right away, before speech finishes. Check chrome.runtime.lastError to make sure there were no errors. Use options.onEvent to get more detailed feedback.</param>
    callback();
};

chrome.tts.stop = function () {
    /// <summary>
    /// Stops any current speech and flushes the queue of any pending utterances. In addition, if speech was paused, it will now be un-paused for the next call to speak.
    /// </summary>
    //No Callback
};

chrome.tts.pause = function () {
    /// <summary>
    /// Pauses speech synthesis, potentially in the middle of an utterance. A call to resume or stop will un-pause speech.
    /// </summary>
    //No Callback
};

chrome.tts.resume = function () {
    /// <summary>
    /// If speech was paused, resumes speaking where it left off.
    /// </summary>
    //No Callback
};

chrome.tts.isSpeaking = function (callback) {
    /// <summary>
    /// Checks whether the engine is currently speaking. On Mac OS X, the result is true whenever the system speech engine is speaking, even if the speech wasn't initiated by Chrome.
    /// </summary>
    /// <param name="callback" type="function" optional="true"></param>
    callback({});
};

chrome.tts.getVoices = function (callback) {
    /// <summary>
    /// Gets an array of all available voices.
    /// </summary>
    /// <param name="callback" type="function" optional="true"></param>
    callback({});
};

//#region Chrome.tts Events
chrome.tts.onEvent = {
    addListener: function (callback) {
        /// <summary>
        /// Used to pass events back to the function calling speak().
        /// </summary>
        callback(new chrome.TtsEvent());
    }
};

//#endregion
//#endregion
//#region Chrome.ttsEngine
chrome.ttsEngine = {};
chrome.ttsEngine.sendTtsEvent = function (requestId, event) {
    /// <summary>
    /// Routes a TTS event from a speech engine to a client.
    /// </summary>
    /// <param name="requestId" type="integer" optional="false"></param>
    /// <param name="event" type="" optional="false">The update event from the text-to-speech engine indicating the status of this utterance.</param>
    //No Callback
};

//#region Chrome.ttsEngine Events
chrome.ttsEngine.onSpeak = {
    addListener: function (callback) {
        /// <summary>
        /// Called when the user makes a call to tts.speak() and one of the voices from this extension's manifest is the first to match the options object.
        /// </summary>
        callback("", {}, {});
    }
};

chrome.ttsEngine.onStop = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a call is made to tts.stop and this extension may be in the middle of speaking. If an extension receives a call to onStop and speech is already stopped, it should do nothing (not raise an error). If speech is in the paused state, this should cancel the paused state.
        /// </summary>
        callback();
    }
};

chrome.ttsEngine.onPause = {
    addListener: function (callback) {
        /// <summary>
        /// Optional: if an engine supports the pause event, it should pause the current utterance being spoken, if any, until it receives a resume event or stop event. Note that a stop event should also clear the paused state.
        /// </summary>
        callback();
    }
};

chrome.ttsEngine.onResume = {
    addListener: function (callback) {
        /// <summary>
        /// Optional: if an engine supports the pause event, it should also support the resume event, to continue speaking the current utterance, if any. Note that a stop event should also clear the paused state.
        /// </summary>
        callback();
    }
};

//#endregion
//#endregion
//#region Chrome.types
chrome.types = {};
//#endregion
//#region Chrome.wallpaper
chrome.wallpaper = {};
chrome.wallpaper.setWallpaper = function (details, callback) {
    /// <summary>
    /// Sets wallpaper to the image at <em>url</em> or <em>wallpaperData</em> with the specified <em>layout</em>
    /// </summary>
    /// <param name="details" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="false"></param>
    callback({});
};

//#endregion
//#region Chrome.webNavigation
chrome.webNavigation = {};
chrome.webNavigation.getFrame = function (details, callback) {
    /// <summary>
    /// Retrieves information about the given frame. A frame refers to an &lt;iframe&gt; or a &lt;frame&gt; of a web page and is identified by a tab ID and a frame ID.
    /// </summary>
    /// <param name="details" type="object" optional="false">Information about the frame to retrieve information about.</param>
    /// <param name="callback" type="function" optional="false"></param>
    callback({});
};

chrome.webNavigation.getAllFrames = function (details, callback) {
    /// <summary>
    /// Retrieves information about all frames of a given tab.
    /// </summary>
    /// <param name="details" type="object" optional="false">Information about the tab to retrieve all frames from.</param>
    /// <param name="callback" type="function" optional="false"></param>
    callback({});
};

//#region Chrome.webNavigation Events
chrome.webNavigation.onBeforeNavigate = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a navigation is about to occur.
        /// </summary>
        callback({});
    }
};

chrome.webNavigation.onCommitted = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a navigation is committed. The document (and the resources it refers to, such as images and subframes) might still be downloading, but at least part of the document has been received from the server and the browser has decided to switch to the new document.
        /// </summary>
        callback({});
    }
};

chrome.webNavigation.onDOMContentLoaded = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when the page's DOM is fully constructed, but the referenced resources may not finish loading.
        /// </summary>
        callback({});
    }
};

chrome.webNavigation.onCompleted = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a document, including the resources it refers to, is completely loaded and initialized.
        /// </summary>
        callback({});
    }
};

chrome.webNavigation.onErrorOccurred = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when an error occurs and the navigation is aborted. This can happen if either a network error occurred, or the user aborted the navigation.
        /// </summary>
        callback({});
    }
};

chrome.webNavigation.onCreatedNavigationTarget = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a new window, or a new tab in an existing window, is created to host a navigation.
        /// </summary>
        callback({});
    }
};

chrome.webNavigation.onReferenceFragmentUpdated = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when the reference fragment of a frame was updated. All future events for that frame will use the updated URL.
        /// </summary>
        callback({});
    }
};

chrome.webNavigation.onTabReplaced = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when the contents of the tab is replaced by a different (usually previously pre-rendered) tab.
        /// </summary>
        callback({});
    }
};

chrome.webNavigation.onHistoryStateUpdated = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when the frame's history was updated to a new URL. All future events for that frame will use the updated URL.
        /// </summary>
        callback({});
    }
};

//#endregion
//#endregion
//#region Chrome.webRequest
chrome.webRequest = {};
chrome.webRequest.handlerBehaviorChanged = function (callback) {
    /// <summary>
    /// Needs to be called when the behavior of the webRequest handlers has changed to prevent incorrect handling due to caching. This function call is expensive. Don't call it often.
    /// </summary>
    /// <param name="callback" type="function" optional="true"></param>
    callback();
};

//#region Chrome.webRequest Events
chrome.webRequest.onBeforeRequest = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a request is about to occur.
        /// </summary>
        callback({});
    }
};

chrome.webRequest.onBeforeSendHeaders = {
    addListener: function (callback) {
        /// <summary>
        /// Fired before sending an HTTP request, once the request headers are available. This may occur after a TCP connection is made to the server, but before any HTTP data is sent. 
        /// </summary>
        callback({});
    }
};

chrome.webRequest.onSendHeaders = {
    addListener: function (callback) {
        /// <summary>
        /// Fired just before a request is going to be sent to the server (modifications of previous onBeforeSendHeaders callbacks are visible by the time onSendHeaders is fired).
        /// </summary>
        callback({});
    }
};

chrome.webRequest.onHeadersReceived = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when HTTP response headers of a request have been received.
        /// </summary>
        callback({});
    }
};

chrome.webRequest.onAuthRequired = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when an authentication failure is received. The listener has three options: it can provide authentication credentials, it can cancel the request and display the error page, or it can take no action on the challenge. If bad user credentials are provided, this may be called multiple times for the same request.
        /// </summary>
        callback({}, {});
    }
};

chrome.webRequest.onResponseStarted = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when the first byte of the response body is received. For HTTP requests, this means that the status line and response headers are available.
        /// </summary>
        callback({});
    }
};

chrome.webRequest.onBeforeRedirect = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a server-initiated redirect is about to occur.
        /// </summary>
        callback({});
    }
};

chrome.webRequest.onCompleted = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a request is completed.
        /// </summary>
        callback({});
    }
};

chrome.webRequest.onErrorOccurred = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when an error occurs.
        /// </summary>
        callback({});
    }
};

//#endregion
//#endregion
//#region Chrome.webRequestInternal
chrome.webRequestInternal = {};
chrome.webRequestInternal.addEventListener = function (callback, filter, extraInfoSpec, eventName, subEventName, webViewInstanceId) {
    /// <summary>
    /// Used internally to implement the special form of addListener for the webRequest events.
    /// </summary>
    /// <param name="callback" type="function" optional="false"></param>
    /// <param name="filter" type="" optional="false">A set of filters that restricts the events that will be sent to this listener.</param>
    /// <param name="extraInfoSpec" type="array" optional="true">Array of extra information that should be passed to the listener function.</param>
    /// <param name="eventName" type="string" optional="false"></param>
    /// <param name="subEventName" type="string" optional="false"></param>
    /// <param name="webViewInstanceId" type="integer" optional="false"></param>
    callback();
};

chrome.webRequestInternal.eventHandled = function (eventName, subEventName, requestId, response) {
    /// <summary>
    /// Used internally to send a response for a blocked event.
    /// </summary>
    /// <param name="eventName" type="string" optional="false"></param>
    /// <param name="subEventName" type="string" optional="false"></param>
    /// <param name="requestId" type="string" optional="false"></param>
    /// <param name="response" type="" optional="true"></param>
    //No Callback
};

//#endregion
//#region Chrome.webstore
chrome.webstore = {};
chrome.webstore.install = function (url, successCallback, failureCallback) {
    /// <summary>
    /// </summary>
    /// <param name="url" type="string" optional="true">If you have more than one <code>&lt;link&gt;</code> tag on your page with the <code>chrome-webstore-item</code> relation, you can choose which item you'd like to install by passing in its URL here. If it is omitted, then the first (or only) link will be used. An exception will be thrown if the passed in URL does not exist on the page.</param>
    /// <param name="successCallback" type="function" optional="true">This function is invoked when inline installation successfully completes (after the dialog is shown and the user agrees to add the item to Chrome). You may wish to use this to hide the user interface element that prompted the user to install the app or extension.</param>
    /// <param name="failureCallback" type="function" optional="true">This function is invoked when inline installation does not successfully complete. Possible reasons for this include the user canceling the dialog, the linked item not being found in the store, or the install being initiated from a non-verified site.</param>
    //No Callback
};

//#endregion
//#region Chrome.webview
chrome.webview = {};
chrome.webview.clearData = function (instanceId, options, dataToRemove, callback) {
    /// <summary>
    /// Clears various types of browsing data stored in a storage partition of a <webview>.
    /// </summary>
    /// <param name="instanceId" type="integer" optional="false">The instance ID of the guest <webview> process.</param>
    /// <param name="options" type="" optional="false"></param>
    /// <param name="dataToRemove" type="" optional="false">The set of data types to remove.</param>
    /// <param name="callback" type="function" optional="true">Called when deletion has completed.</param>
    callback();
};

chrome.webview.executeScript = function (instanceId, details, callback) {
    /// <summary>
    /// Injects JavaScript code into a <webview> page.
    /// </summary>
    /// <param name="instanceId" type="integer" optional="false">The instance ID of the guest <webview> process.</param>
    /// <param name="details" type="" optional="false">Details of the script to run.</param>
    /// <param name="callback" type="function" optional="true">Called after all the JavaScript has been executed.</param>
    callback({});
};

chrome.webview.insertCSS = function (instanceId, details, callback) {
    /// <summary>
    /// Injects JavaScript code into a <webview> page.
    /// </summary>
    /// <param name="instanceId" type="integer" optional="false">The instance ID of the guest <webview> process.</param>
    /// <param name="details" type="" optional="false">Details of the script to run.</param>
    /// <param name="callback" type="function" optional="true">Called after all the JavaScript has been executed.</param>
    callback({});
};

chrome.webview.captureVisibleRegion = function (instanceId, options, callback) {
    /// <summary>
    /// Captures the visible area of the currently loaded page inside <webview>.
    /// </summary>
    /// <param name="instanceId" type="integer" optional="false">The instance ID of the guest <webview> process.</param>
    /// <param name="options" type="" optional="true"></param>
    /// <param name="callback" type="function" optional="false"></param>
    callback("");
};

chrome.webview.go = function (instanceId, relativeIndex) {
    /// <summary>
    /// </summary>
    /// <param name="instanceId" type="integer" optional="false"></param>
    /// <param name="relativeIndex" type="integer" optional="false"></param>
    //No Callback
};

chrome.webview.overrideUserAgent = function (instanceId, userAgentOverride) {
    /// <summary>
    /// </summary>
    /// <param name="instanceId" type="integer" optional="false"></param>
    /// <param name="userAgentOverride" type="string" optional="false"></param>
    //No Callback
};

chrome.webview.reload = function (instanceId) {
    /// <summary>
    /// </summary>
    /// <param name="instanceId" type="integer" optional="false"></param>
    //No Callback
};

chrome.webview.setPermission = function (instanceId, requestId, action, userInput, callback) {
    /// <summary>
    /// </summary>
    /// <param name="instanceId" type="integer" optional="false"></param>
    /// <param name="requestId" type="integer" optional="false"></param>
    /// <param name="action" type="string" optional="false"></param>
    /// <param name="userInput" type="string" optional="true"></param>
    /// <param name="callback" type="function" optional="true"></param>
    callback({});
};

chrome.webview.stop = function (instanceId) {
    /// <summary>
    /// </summary>
    /// <param name="instanceId" type="integer" optional="false"></param>
    //No Callback
};

chrome.webview.terminate = function (instanceId) {
    /// <summary>
    /// </summary>
    /// <param name="instanceId" type="integer" optional="false"></param>
    //No Callback
};

//#endregion
//#region Chrome.webViewRequest
chrome.webViewRequest = {};
//#endregion
//#region Chrome.webviewTag
chrome.webviewTag = {};
chrome.webviewTag.back = function () {
    /// <summary>
    /// Navigates backward one history entry if possible. Equivalent to <code>go(-1)</code>.
    /// </summary>
    //No Callback
};

chrome.webviewTag.canGoBack = function () {
    /// <summary>
    /// Indicates whether or not it is possible to navigate backward through history.
    /// </summary>
    //No Callback
    return true;
};

chrome.webviewTag.canGoForward = function () {
    /// <summary>
    /// Indicates whether or not it is possible to navigate forward through history.
    /// </summary>
    //No Callback
    return true;
};

chrome.webviewTag.clearData = function (options, types, callback) {
    /// <summary>
    /// <p>Clears browsing data for the <code>webview</code> partition.</p>
    /// </summary>
    /// <param name="options" type="" optional="false">Options determining exactly what data to clear.</param>
    /// <param name="types" type="" optional="false">The types of data to be cleared.</param>
    /// <param name="callback" type="function" optional="true">Called after the data has been successfully cleared.</param>
    callback();
};

chrome.webviewTag.executeScript = function (details, callback) {
    /// <summary>
    /// <p>Injects JavaScript code into the guest page.</p><p>The following sample code uses script injection to set the guest page's background color to red:</p><pre>webview.executeScript({ code: "document.body.bgColor = 'red'" });</pre>
    /// </summary>
    /// <param name="details" type="" optional="false">Details of the script to run.</param>
    /// <param name="callback" type="function" optional="true">Called after all the JavaScript has been executed.</param>
    callback({});
};

chrome.webviewTag.forward = function () {
    /// <summary>
    /// Navigates forward one history entry if possible. Equivalent to <code>go(1)</code>.
    /// </summary>
    //No Callback
};

chrome.webviewTag.getProcessId = function () {
    /// <summary>
    /// Returns Chrome's internal process ID for the guest web page's current process, allowing embedders to know how many guests would be affected by terminating the process. Two guests will share a process only if they belong to the same app and have the same <a href="#partition">storage partition ID</a>. The call is synchronous and returns the embedder's cached notion of the current process ID. The process ID isn't the same as the operating system's process ID.
    /// </summary>
    //No Callback
    return {};
};

chrome.webviewTag.getUserAgent = function () {
    /// <summary>
    /// Returns the user agent string used by the webview for guest page requests.
    /// </summary>
    //No Callback
    return "";
};

chrome.webviewTag.go = function (relativeIndex) {
    /// <summary>
    /// Navigates to a history entry using a history index relative to the current navigation. If the requested navigation is impossible, this method has no effect.
    /// </summary>
    /// <param name="relativeIndex" type="integer" optional="false">Relative history index to which the webview should be navigated. For example, a value of <code>2</code> will navigate forward 2 history entries if possible; a value of <code>-3</code> will navigate backward 3 entries.</param>
    //No Callback
};

chrome.webviewTag.insertCSS = function (details, callback) {
    /// <summary>
    /// Injects CSS into the guest page.
    /// </summary>
    /// <param name="details" type="" optional="false">Details of the CSS to insert.</param>
    /// <param name="callback" type="function" optional="true">Called after the CSS has been inserted.</param>
    callback();
};

chrome.webviewTag.isUserAgentOverridden = function () {
    /// <summary>
    /// Indicates whether or not the webview's user agent string has been overridden by ref:setUserAgentOverride
    /// </summary>
    //No Callback
};

chrome.webviewTag.reload = function () {
    /// <summary>
    /// Reloads the current top-level page.
    /// </summary>
    //No Callback
};

chrome.webviewTag.setUserAgentOverride = function (userAgent) {
    /// <summary>
    /// Override the user agent string used by the webview for guest page requests.
    /// </summary>
    /// <param name="userAgent" type="string" optional="false">The user agent string to use.</param>
    //No Callback
};

chrome.webviewTag.stop = function () {
    /// <summary>
    /// Stops loading the current &lt;webview> navigation if in progress.
    /// </summary>
    //No Callback
};

chrome.webviewTag.terminate = function () {
    /// <summary>
    /// Forcibly kills the guest web page's renderer process. This may affect multiple <code>webview</code> tags in the current app if they share the same process, but it will not affect <code>webview</code> tags in other apps.
    /// </summary>
    //No Callback
};

//#region Chrome.webviewTag Events
chrome.webviewTag.close = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when the guest window attempts to close itself.<p>The following example code navigates the webview to <code>about:blank</code> when the guest attempts to close itself.</p><pre>webview.addEventListener('close', function() {
        ///   webview.src = 'about:blank';
        /// });</pre>
        /// </summary>
        callback();
    }
};

chrome.webviewTag.consolemessage = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when the guest window logs a console message.<p>The following example code forwards all log messages to the embedder's console without regard for log level or other properties.</p><pre>webview.addEventListener('consolemessage', function(e) {
        ///   console.log('Guest page logged a message: ', e.message);
        /// });</pre>
        /// </summary>
        callback({}, "", {}, "");
    }
};

chrome.webviewTag.contentload = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when the guest window fires a <code>load</code> event.<p>The following example code modifies the default font size of the guest's <code>body</code> element after the page loads:</p><pre>webview.addEventListener('contentload', function() {
        ///   webview.executeScript({ code: 'document.body.style.fontSize = "42px"' });
        /// });</pre>
        /// </summary>
        callback();
    }
};

chrome.webviewTag.dialog = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when the guest window attempts to open a modal dialog via <code>window.alert</code>, <code>window.confirm</code>, or <code>window.prompt</code>.<p>Handling this event will block the guest process until each event listener returns or the <code>dialog</code> object becomes unreachable (if <code>preventDefault()</code> was called.)</p><p>The default behavior is to cancel the dialog.</p>
        /// </summary>
        callback("", "", new chrome.DialogController());
    }
};

chrome.webviewTag.exit = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when the process rendering the guest web content has exited.<p>The following example code will show a farewell message whenever the guest page crashes:</p><pre>webview.addEventListener('exit', function(e) {
        ///   if (e.reason === 'crash') {
        ///     webview.src = 'data:text/plain,Goodbye, world!';
        ///   }
        /// });</pre>
        /// </summary>
        callback({}, "");
    }
};

chrome.webviewTag.loadabort = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a top-level load has aborted without committing.
        /// </summary>
        callback("", true, "");
    }
};

chrome.webviewTag.loadcommit = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a load has committed.
        /// </summary>
        callback("", true);
    }
};

chrome.webviewTag.loadredirect = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a top-level load request has redirected to a different URL.
        /// </summary>
        callback("", "", true);
    }
};

chrome.webviewTag.loadstart = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a load has begun.
        /// </summary>
        callback("", true);
    }
};

chrome.webviewTag.loadstop = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when all loads in the guest page (including all subframes) have completed. Fires in addition to any related <code>loadcommit</code> or <code>loadabort</code> events, which occur per-frame.
        /// </summary>
        callback();
    }
};

chrome.webviewTag.newwindow = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when the guest page attempts to open a new browser window.<p>The following example code will create and navigate a new <code>webview</code> in the embedder for each requested new window:</p><pre>webview.addEventListener('newwindow', function(e) {
        ///   var newWebview = document.createElement('webview');
        ///   document.body.appendChild(newWebview);
        ///   e.window.attach(newWebview);
        /// });</pre>
        /// </summary>
        callback(new chrome.NewWindow(), "", 0, 0, "", "");
    }
};

chrome.webviewTag.permissionrequest = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when the guest page needs to request special permission from the embedder.<p>The following example code will grant the guest page access to the <code>webkitGetUserMedia</code> API. Note that an app using this example code must itself specify <code>audioCapture</code> and/or <code>videoCapture</code> manifest permissions:</p><pre>webview.addEventListener('permissionrequest', function(e) {
        ///   if (e.permission === 'media') {
        ///     e.request.allow();
        ///   }
        /// });</pre>
        /// </summary>
        callback("", {}, {});
    }
};

chrome.webviewTag.responsive = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when the process rendering the guest web content has become responsive again after being unresponsive.<p>The following example code will fade the <code>webview</code> element in or out as it becomes responsive or unresponsive:</p><pre>webview.style.webkitTransition = 'opacity 250ms';
        /// webview.addEventListener('unresponsive', function() {
        ///   webview.style.opacity = '0.5';
        /// });
        /// webview.addEventListener('responsive', function() {
        ///   webview.style.opacity = '1';
        /// });</pre>
        /// </summary>
        callback({});
    }
};

chrome.webviewTag.sizechanged = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when the embedded web content has been resized. Only fires if <code>autosize</code> is enabled.
        /// </summary>
        callback(0, 0, 0, 0);
    }
};

chrome.webviewTag.unresponsive = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when the process rendering the guest web content has become unresponsive. This event will be generated once with a matching responsive event if the guest begins to respond again.
        /// </summary>
        callback({});
    }
};

//#endregion
//#endregion
//#region Chrome.windows
chrome.windows = {};
chrome.windows.get = function (windowId, getInfo, callback) {
    /// <summary>
    /// Gets details about a window.
    /// </summary>
    /// <param name="windowId" type="integer" optional="false"></param>
    /// <param name="getInfo" type="object" optional="true"></param>
    /// <param name="callback" type="function" optional="false"></param>
    callback(new chrome.Window());
};

chrome.windows.getCurrent = function (getInfo, callback) {
    /// <summary>
    /// Gets the <a href='#current-window'>current window</a>.
    /// </summary>
    /// <param name="getInfo" type="object" optional="true"></param>
    /// <param name="callback" type="function" optional="false"></param>
    callback(new chrome.Window());
};

chrome.windows.getLastFocused = function (getInfo, callback) {
    /// <summary>
    /// Gets the window that was most recently focused &mdash; typically the window 'on top'.
    /// </summary>
    /// <param name="getInfo" type="object" optional="true"></param>
    /// <param name="callback" type="function" optional="false"></param>
    callback(new chrome.Window());
};

chrome.windows.getAll = function (getInfo, callback) {
    /// <summary>
    /// Gets all windows.
    /// </summary>
    /// <param name="getInfo" type="object" optional="true"></param>
    /// <param name="callback" type="function" optional="false"></param>
    callback({});
};

chrome.windows.create = function (createData, callback) {
    /// <summary>
    /// Creates (opens) a new browser with any optional sizing, position or default URL provided.
    /// </summary>
    /// <param name="createData" type="object" optional="true"></param>
    /// <param name="callback" type="function" optional="true"></param>
    callback(new chrome.Window());
};

chrome.windows.update = function (windowId, updateInfo, callback) {
    /// <summary>
    /// Updates the properties of a window. Specify only the properties that you want to change; unspecified properties will be left unchanged.
    /// </summary>
    /// <param name="windowId" type="integer" optional="false"></param>
    /// <param name="updateInfo" type="object" optional="false"></param>
    /// <param name="callback" type="function" optional="true"></param>
    callback(new chrome.Window());
};

chrome.windows.remove = function (windowId, callback) {
    /// <summary>
    /// Removes (closes) a window, and all the tabs inside it.
    /// </summary>
    /// <param name="windowId" type="integer" optional="false"></param>
    /// <param name="callback" type="function" optional="true"></param>
    callback();
};

//#region Chrome.windows Events
chrome.windows.onCreated = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a window is created.
        /// </summary>
        callback(new chrome.Window());
    }
};

chrome.windows.onRemoved = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a window is removed (closed).
        /// </summary>
        callback({});
    }
};

chrome.windows.onFocusChanged = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when the currently focused window changes. Will be chrome.windows.WINDOW_ID_NONE if all chrome windows have lost focus. Note: On some Linux window managers, WINDOW_ID_NONE will always be sent immediately preceding a switch from one chrome window to another.
        /// </summary>
        callback({});
    }
};

//#endregion
//#endregion
//#region Chrome.devtools.panels
chrome.devtools.panels = {};
chrome.devtools.panels.create = function (title, iconPath, pagePath, callback) {
    /// <summary>
    /// Creates an extension panel.
    /// </summary>
    /// <param name="title" type="string" optional="false">Title that is displayed next to the extension icon in the Developer Tools toolbar.</param>
    /// <param name="iconPath" type="string" optional="false">Path of the panel's icon relative to the extension directory.</param>
    /// <param name="pagePath" type="string" optional="false">Path of the panel's HTML page relative to the extension directory.</param>
    /// <param name="callback" type="function" optional="true">A function that is called when the panel is created.</param>
    callback(new chrome.ExtensionPanel());
};

chrome.devtools.panels.setOpenResourceHandler = function (callback) {
    /// <summary>
    /// Specifies the function to be called when the user clicks a resource link in the Developer Tools window. To unset the handler, either call the method with no parameters or pass null as the parameter.
    /// </summary>
    /// <param name="callback" type="function" optional="true">A function that is called when the user clicks on a valid resource link in Developer Tools window. Note that if the user clicks an invalid URL or an XHR, this function is not called.</param>
    callback(new chrome.devtools.inspectedWindow.Resource());
};

//#endregion
//#region Chrome.devtools.inspectedWindow
chrome.devtools.inspectedWindow = {};
chrome.devtools.inspectedWindow.eval = function (expression, callback) {
    /// <summary>
    /// Evaluates a JavaScript expression in the context of the main frame of the inspected page. The expression must evaluate to a JSON-compliant object, otherwise an exception is thrown.
    /// </summary>
    /// <param name="expression" type="string" optional="false">An expression to evaluate.</param>
    /// <param name="callback" type="function" optional="true">A function called when evaluation completes.</param>
    callback({}, {});
};

chrome.devtools.inspectedWindow.reload = function (reloadOptions) {
    /// <summary>
    /// Reloads the inspected page.
    /// </summary>
    /// <param name="reloadOptions" type="object" optional="true"></param>
    //No Callback
};

chrome.devtools.inspectedWindow.getResources = function (callback) {
    /// <summary>
    /// Retrieves the list of resources from the inspected page.
    /// </summary>
    /// <param name="callback" type="function" optional="false">A function that receives the list of resources when the request completes.</param>
    callback({});
};

//#region Chrome.devtools.inspectedWindow Events
chrome.devtools.inspectedWindow.onResourceAdded = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a new resource is added to the inspected page.
        /// </summary>
        callback(new chrome.Resource());
    }
};

chrome.devtools.inspectedWindow.onResourceContentCommitted = {
    addListener: function (callback) {
        /// <summary>
        /// Fired when a new revision of the resource is committed (e.g. user saves an edited version of the resource in the Developer Tools).
        /// </summary>
        callback(new chrome.Resource(), "");
    }
};

//#endregion
//#endregion
