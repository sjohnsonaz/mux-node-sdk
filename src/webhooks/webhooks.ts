/* globals Buffer */
import VerifyHeader from './resources/verify_header';

/**
 * Webhooks - Provides access to the Mux Webhooks signature verification
 *
 * @example
 * import * as Mux from '@mux/mux-node';
 * const { Webhooks } = Mux;
 *
 * // Verify a webhook signature
 * Webhooks.verifyHeader(body, signature, secret);
 *
 */
export default class Webhooks {
  /**
   * Verify a webhook signature. When enabled, Mux will send webhooks with a signature
   * in the http request header 'Mux-Signature'. You can use that signature to verify
   * that the webhook is indeed coming from Mux.
   *
   * @param {string} body - The raw request body from Mux. This is stringified JSON.
   * @param {string} signature - The signature that was in the request header.
   * @param {string} secret - The webhook signing secret (get this from your dashboard).
   * @returns {boolean} - Returns true if the signature is verified.
   *
   * @throws {Error} throw error when a webhook signature verification fails.
   *
   * @example
   * import * as Mux from '@mux/mux-node';
   * const { Webhooks } = Mux;
   *
   * // Verify a webhook signature
   * Webhooks.verifyHeader(body, signature, secret);
   *
   * @see https://docs.mux.com/docs/webhook-security
   */
  static verifyHeader(_payload: string | Buffer, _header: string | Buffer, secret: string, tolerance?: number): boolean {
    return VerifyHeader.verify(_payload, _header, secret, tolerance);
  }
}