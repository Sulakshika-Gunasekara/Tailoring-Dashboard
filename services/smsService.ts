/**
 * SMS Service Simulation
 *
 * In a production environment, this service would integrate with an SMS gateway provider
 * such as Twilio, AWS SNS, or MessageBird.
 *
 * Example using Twilio (Conceptual):
 *
 * import twilio from 'twilio';
 * const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
 *
 * export const sendSMS = async (to: string, body: string) => {
 *   return await client.messages.create({
 *     body: body,
 *     from: process.env.TWILIO_PHONE_NUMBER,
 *     to: to
 *   });
 * }
 */

export const sendSMS = async (to: string, body: string): Promise<{ success: boolean; message: string }> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  console.log(`[SMS SERVICE] Sending to ${to}: "${body}"`);

  // Simulate success
  return {
    success: true,
    message: 'Message sent successfully'
  };
};
