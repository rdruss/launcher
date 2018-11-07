import { action } from '../../../shared/utils/Actions';

export enum LaunchActions {
  LAUNCH_PROJECTILE = 'LAUNCH_PROJECTILE',
  LAUNCH_PROJECTILE_FOLLOW_PROGRESS = 'LAUNCH_PROJECTILE_FOLLOW_PROGRESS',
  LAUNCH_PROJECTILE_PROGRESS_MESSAGE = 'LAUNCH_PROJECTILE_PROGRESS_MESSAGE',
  LAUNCH_PROJECTILE_SUCCESS = 'LAUNCH_PROJECTILE_SUCCESS',
  LAUNCH_PROJECTILE_FAILURE = 'LAUNCH_PROJECTILE_FAILURE',
  RESET_LAUNCH = 'RESET_LAUNCH',
}

export const launchActions = {
  launchProjectile: (payload) => action(LaunchActions.LAUNCH_PROJECTILE, {payload}),
  launchProjectileFollowProgress: (result) => action(LaunchActions.LAUNCH_PROJECTILE_FOLLOW_PROGRESS, {result}),
  launchProjectileProgressMessage: (message) => action(LaunchActions.LAUNCH_PROJECTILE_PROGRESS_MESSAGE, {message}),
  launchProjectileSuccess: (result) => action(LaunchActions.LAUNCH_PROJECTILE_SUCCESS, {result}),
  launchProjectileFailure: (error) => action(LaunchActions.LAUNCH_PROJECTILE_FAILURE, {error}),
  resetLaunch: () => action(LaunchActions.RESET_LAUNCH, {}),
};