import NameStep from '../../../components/creator-wizard/name-step/NameStep';
import connectWizardStep from '../connectWizardStep';
import { ConnectedComponentClass } from 'react-redux';

const NameStepContainer: ConnectedComponentClass<any, any> = connectWizardStep(NameStep);

export default NameStepContainer;