import { action } from '../../utils/Actions';
import Runtime from '../models/Runtime';
import Capability from '../models/Capability';
import { WizardStepId } from '../states/WizardState';
import OpenShiftCluster from '../models/OpenShiftCluster';

export enum AuthenticationAction {
  AUTHENTICATE = 'AUTHENTICATE',
  USER_CONNECTED = 'AUTHENTICATION_USER_CONNECTED',
  USER_NOT_CONNECTED = 'AUTHENTICATION_USER_NOT_CONNECTED',
  AUTHENTICATION_FAILURE = 'AUTHENTICATION_FAILURE',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  OPEN_ACCOUNT_MANAGEMENT = 'OPEN_ACCOUNT_MANAGEMENT',
}

export const authenticationAction = {
  authenticate: () => action(AuthenticationAction.AUTHENTICATE, {}),
  login: () => action(AuthenticationAction.LOGIN, {}),
  userConnected: (response) => action(AuthenticationAction.USER_CONNECTED, {response}),
  userNotConnected: () => action(AuthenticationAction.USER_NOT_CONNECTED, {}),
  authenticationFailure: (error) => action(AuthenticationAction.AUTHENTICATION_FAILURE, {error}),
  logout: () => action(AuthenticationAction.LOGOUT, {}),
  openAccountManagement: () => action(AuthenticationAction.OPEN_ACCOUNT_MANAGEMENT, {}),
};

export enum ApiAction {
  FETCH_CAPABILITIES = 'API_FETCH_CAPABILITIES',
  FETCH_RUNTIMES = 'API_FETCH_RUNTIMES',
  FETCH_CLUSTERS = 'API_FETCH_CLUSTERS',
  FETCH_REPOSITORY = 'API_FETCH_REPOSITORY',
}

export const apiAction = {
  fetchCapabilities: () => action(ApiAction.FETCH_CAPABILITIES, { request: { url: `/capabilities` } }),
  fetchRuntimes: () => action(ApiAction.FETCH_RUNTIMES, { request: { url: `/runtimes` } }),
  fetchClusters: () => action(ApiAction.FETCH_CLUSTERS, {
    request: { url: `/services/openshift/clusters`, headers: {'X-App': 'launcher'} }, meta: { driver: 'launcher' }
  }),
  fetchRepository: () => action(ApiAction.FETCH_REPOSITORY, { }),
};

export enum WizardAction {
  SELECT_TITLE = 'WIZARD_SELECT_TITLE',
  SELECT_RUNTIME = 'WIZARD_SELECT_RUNTIME',
  SELECT_CLUSTER = 'WIZARD_SELECT_CLUSTER',
  ADD_CAPABILITY = 'WIZARD_ADD_CAPABILITY',
  REMOVE_CAPABILITY = 'WIZARD_REMOVE_CAPABILITY',
  GO_TO_STEP = 'WIZARD_GO_TO_STEP',
}

export const wizardAction = {
  selectTitle: (title: string) => action(WizardAction.SELECT_TITLE, {title}),
  selectRuntime: (runtime: Runtime) => action(WizardAction.SELECT_RUNTIME, {runtime}),
  selectCluster: (cluster: OpenShiftCluster) => action(WizardAction.SELECT_CLUSTER, {cluster}),
  addCapability: (capability: Capability) => action(WizardAction.ADD_CAPABILITY, {capability}),
  removeCapability: (capability: Capability) => action(WizardAction.REMOVE_CAPABILITY, {capability}),
  goToStep: (stepId: WizardStepId) => action(WizardAction.GO_TO_STEP, {stepId}),
};


