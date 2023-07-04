import { rpcErrors } from '@metamask/rpc-errors';
import { OnRpcRequestHandler } from '@metamask/snaps-types';
import { hexToBytes } from '@metamask/utils';
import { panel, text } from '@metamask/snaps-ui';

import program from '../../../snap-rs/pkg/snap_rs_bg.wasm';

let wasm;
/**
 * Instantiate the WASM module and store the exports in `wasm`. This function
 * is called lazily, when the first JSON-RPC request is received.
 *
 * We use Webpack's `asset/inline` loader to inline the WASM module as a hex
 * string. This string is then converted to a byte array and passed to
 * `WebAssembly.instantiate` to instantiate the module.
 *
 * For this example, we're using AssemblyScript to generate the WASM module, but
 * you can use any language that can compile to WASM.
 *
 * @returns A promise that resolves when the WASM module is instantiated.
 * @throws If the WASM module fails to instantiate.
 */
const initializeWasm = async () => {
  try {
    throw new Error(`program: ${program}`);
    const { instance } = await WebAssembly.instantiate(program, {});

    wasm = instance.exports;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to instantiate WebAssembly module.', error);
    throw error;
  }
};

/**
 * Handle incoming JSON-RPC requests from the dapp, sent through the
 * `wallet_invokeSnap` method. This handler handles a single method:
 *
 * - `fibonacci`: Calculate the nth Fibonacci number. This method takes a
 * single parameter, `n` (as array), which is the index of the Fibonacci number
 * to calculate. This uses the WASM module to calculate the Fibonacci number.
 *
 * @param params - The request parameters.
 * @param params.request - The JSON-RPC request object.
 * @returns The JSON-RPC response.
 * @see https://docs.metamask.io/snaps/reference/exports/#onrpcrequest
 * @see https://docs.metamask.io/snaps/reference/rpc-api/#wallet_invokesnap
 * @see https://docs.metamask.io/snaps/reference/permissions/#endowmentwebassembly
 * @see https://developer.mozilla.org/docs/WebAssembly
 */
export const onRpcRequest: OnRpcRequestHandler = async ({ origin, request }) => {
  // Instantiate the WASM module if it hasn't been instantiated yet.
  if (!wasm) {
    await initializeWasm();
  }
  throw new Error(`wasm add function: ${Object.keys(wasm)}`);
  //const result = wasm_bindgen.add(1, 2);
  //throw new Error(`result: ${result}`);

  // For this example, we don't validate the request. We assume that the
  // request is valid, and that the snap is only called with valid requests. In
  // a real snap, you should validate the request before calling the WASM
  // module.
  //const method = request.method as Method;
  //const params = request.params as Parameters<Program[typeof method]>;

  //if (wasm[method]) {
  //  return wasm[method](...params);
  //}

  //throw rpcErrors.methodNotFound({ data: { request } });
};

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */
/*
export const onRpcRequest: OnRpcRequestHandler = ({ origin, request }) => {
  switch (request.method) {
    case 'hello':
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: panel([
            text(`Hello, **${origin}**!`),
            text('This custom confirmation is just for display purposes.'),
            text(
              'But you can edit the snap source code to make it do something, if you want to!',
            ),
          ]),
        },
      });
    default:
      throw new Error('Method not found lol.');
  }
};
*/
