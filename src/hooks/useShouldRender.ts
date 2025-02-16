function Foo() {
  const disabled = useDisabled(() => true);
  const cops = useConnections(Types.COP);

  return (
    <Conditional should={() => true}>
      <Button disabled={disabled}>Action</Button>
      <Conditional should={() => true}>
        <Menu>
          {cops.map(({ id, name }) => (
            <Option key={id}>{name}</Option>
          ))}
        </Menu>
      </Conditional>
    </Conditional>
  );
}

// get all types, or filtered types

// could filter in hook
// some actions are connection type specific
// event manager understands an interface for storing connections using dependency injection
