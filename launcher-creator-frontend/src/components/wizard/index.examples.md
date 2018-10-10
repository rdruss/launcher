Wizard example:

```jsx
<Wizard>
    <Wizard.Step title={'Step 1'} completed={true}>Step 1 form</Wizard.Step>
    <Wizard.Step title={'Step 2'} selected={true}>
        <p>Step 2 form</p>
        <Wizard.Button type="next"/>
    </Wizard.Step>
    <Wizard.Step title={'Step 3'} locked={true}>Step 3 form</Wizard.Step>
</Wizard>
```