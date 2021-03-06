import { call, select, put, takeEvery } from 'redux-saga/effects';
import fetchSaga from '../lib/sagas/fetchSaga';
import { fromUser } from '../sharedSelectors';

import { EXPORT_FIELDS, exportFieldsError } from './';
import downloadFile from '../lib/downloadFile';

export function* handleExportPublishedDatasetSuccess() {
    const request = yield select(fromUser.getExportFieldsRequest);
    const { error, response } = yield call(fetchSaga, request, [], 'blob');

    if (error) {
        yield put(exportFieldsError(error));
        return;
    }

    yield call(downloadFile, response, 'lodex_export.json');
}

export default function*() {
    yield takeEvery(EXPORT_FIELDS, handleExportPublishedDatasetSuccess);
}
