import * as React from 'react';
import { connect } from 'react-redux';
import MainLayoutContainer from '@app/redux/containers/MainLayoutContainer';
import CreatorWizardContainer from '@app/redux/containers/creator-wizard/CreatorWizardContainer';
import { AppState } from '@app/redux/states';

function WizardPage() {
  return (
    <MainLayoutContainer>
      <div className="container">
        <h1>You are creating a new application</h1>
        <CreatorWizardContainer/>
      </div>
    </MainLayoutContainer>
  );
}

const mapStateToProps = (state: AppState) => ({});

const mapDispatchToProps = (dispatch) => ({});

const WizardPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WizardPage);

export default WizardPageContainer;
