export const URI_FIELD_NAME = 'uri';

export const getResourceUri = resource => {
    const uri = resource.uri;
    if (!uri) {
        return null;
    }
    if (uri.startsWith('uid:/')) {
        return `/uid:/${encodeURIComponent(uri.substr(5))}`;
    }
    if (uri.startsWith('ark:/')) {
        return `/${uri}`;
    }
    if (uri.startsWith('http://' || uri.startsWith('https://'))) {
        return `/resource?uri=${encodeURIComponent(uri)}`;
    }

    return `/uid:/${encodeURIComponent(uri)}`;
};

// Browser usage only, For api we must use directely config.host
export const getHost = () => {
    if (typeof window !== 'undefined') {
        return `${window.location.protocol}//${window.location.host}`;
    }
    return '';
};

export const getFullResourceUri = (resource, defaultBaseUri) => {
    const baseUri = getHost() || defaultBaseUri;
    const uri = getResourceUri(resource);

    return `${baseUri}${uri}`;
};
