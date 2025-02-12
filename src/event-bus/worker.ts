interface MessagePort {
  inactivityTimeout?: NodeJS.Timeout;
}

const connections: MessagePort[] = [];

// @ts-expect-error who cares
onconnect = (event: MessageEvent) => {
  const port = event.ports[0];
  // @ts-expect-error who cares
  connections.push(port);
  console.log('Connection established', connections);

  // Listen for messages from each port
  port.onmessage = (event: MessageEvent) => {
    console.log('Message received:', event.data.message);

    if (event.data.message === 'CLOSE') {
      // @ts-expect-error who cares
      const index = connections.indexOf(port);
      console.log(index);
      if (index !== -1) {
        connections.splice(index, 1);
        console.log(
          'Port removed. Number of connections remaining',
          connections.length
        );
      }

      port.close();
      return;
    }

    port.postMessage(event.data);

    // Broadcast the message to all other ports
    connections.forEach((connectedPort) => {
      // @ts-expect-error who cares
      connectedPort.postMessage(event.data);
    });
  };

  port.onmessageerror = (event: MessageEvent) => {
    console.log('error', event);
  };
};
