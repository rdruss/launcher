import { requestsReducer } from 'redux-saga-requests';
import { ApiAction } from '../../actions';
import { AppState } from '../../states';
import { createSelector } from 'reselect';
import Capability from '../../models/Capability';
import { FetchedData } from '../../models/FetchedData';

// Reducer

export const capabilitiesReducer = requestsReducer({ actionType: ApiAction.FETCH_CAPABILITIES, multiple: true });

// Selectors

export interface PropsWithSelectedRuntime {
  selectedRuntime?: { id: string; };
}

function createCapabilityFilterForRuntime(runtimeId?: string): (Capability) => boolean {
  return (c) => !runtimeId || Boolean(c.props.runtime && c.props.runtime.values.find(p => p.id === runtimeId));
}

const getCapabilitiesState = (state:AppState) => state.capabilities;

const getSelectedRuntimeId = (state:AppState, { selectedRuntime }: PropsWithSelectedRuntime) => selectedRuntime && selectedRuntime.id;

export const getCapabilitiesData = createSelector([getCapabilitiesState], (f) => ({
  data: f.data,
  loading: f.pending > 0,
  error: f.error,
} as FetchedData<Capability[]>));

export const getCapabilitiesDataForSelectedRuntime = createSelector([getCapabilitiesData, getSelectedRuntimeId], (c, r) => ({
  data: c.data.filter(createCapabilityFilterForRuntime(r)),
  loading: c.loading,
  error: c.error,
} as FetchedData<Capability[]>));