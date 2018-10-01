import TitleStep from '../../../components/creator-wizard/title-step/TitleStep';
import connectWizardStep from '../connectWizardStep';
import { ConnectedComponentClass } from 'react-redux';

const TitleStepContainer: ConnectedComponentClass<any, any> = connectWizardStep(TitleStep);

export default TitleStepContainer;