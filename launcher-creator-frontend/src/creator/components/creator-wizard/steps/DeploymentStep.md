```jsx
const props = {
    clustersData: {
        data: [
            { name: 'cluster-1' },
            { name: 'cluster-2' },
        ]
    },
    fetchClusters: () => {},
    stepId: 'deployment-step',
    context: {},
    status: {
        completed: false,
        locked: false,
        selected: true,
    },
    select: () => {},
    submit: () => {},
    updateStepContext: () => {}
};
<Wizard>
    <DeploymentStep {...props}/>
</Wizard>
```