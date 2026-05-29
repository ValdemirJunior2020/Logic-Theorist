import type { Puzzle, Language } from '../types/game'

const en: Puzzle[] = [
  {
    id: 'voice-07-res-not-found', row: 7, category: 'Hotel & Reservation Issues',
    scenario: 'Reservation not found at check-in', caller: 'Professor Panic Button',
    rageLine: 'The guest is in the lobby and my logic tubes are sweating!',
    premise: 'The reservation is not found at check-in. The Voice Matrix says call the supplier first. If the supplier does not confirm within 20 minutes, create a ticket.',
    question: 'What is the correct first move?',
    options: ['Create a ticket immediately and hide under the desk', 'Call the supplier first', 'Send Slack for every future-date booking', 'Offer random free breakfast'],
    answerIndex: 1,
    explanation: 'Correct. Voice Matrix Row 7 says: call supplier first, then if unconfirmed by supplier in 20 minutes, create a ticket. Slack is only for same-day check-ins.',
    matrixInstruction: '1. Call Supplier. 2. If unconfirmed by Supplier in 20 minutes, create ticket.',
    slack: "YES - Only for same day check in's. NO SLACK FOR FUTURE DATES.", refundQueue: 'YES - for a voucher if rebooking', createTicket: 'NONE', supervisor: 'Yes', difficulty: 1, source: 'Voice Matrix Row 7'
  },
  {
    id: 'voice-08-overbooking', row: 8, category: 'Hotel & Reservation Issues',
    scenario: 'Overbooking relocation / hotel closed', caller: 'Dr. Walked Reservation',
    rageLine: 'The hotel vanished like a theorem in a blender!',
    premise: 'A guest was walked due to overbooking or the hotel is closed down. The Voice Matrix gives a shorter supplier wait time than reservation not found.',
    question: 'After calling the supplier, how long do you wait before ticket action if unresolved?',
    options: ['10 minutes', '20 minutes', 'Until the phone becomes self-aware', 'Never create anything'],
    answerIndex: 0,
    explanation: 'Correct. Voice Matrix Row 8 says call supplier, then if unconfirmed by supplier in 10 minutes, create the next action. Same-day Slack only.',
    matrixInstruction: '1. Call Supplier. 2. If unconfirmed by Supplier in 10 minutes, create ticket.',
    slack: "YES - Only for same day check in's. NO SLACK FOR FUTURE DATES.", refundQueue: 'YES - for a voucher if rebooking', createTicket: 'NONE', supervisor: 'No', difficulty: 1, source: 'Voice Matrix Row 8'
  },
  {
    id: 'voice-09-name', row: 9, category: 'Hotel & Reservation Issues',
    scenario: 'Incorrect guest name / modifying name', caller: 'Miss Typo Von Keyboard',
    rageLine: 'My guest name is wrong and the lobby clerk is judging my vowels!',
    premise: 'The guest name is incorrect. The Voice Matrix warns not to change the name directly.',
    question: 'What should the agent ask the hotel to do?',
    options: ['Delete the reservation and start a campfire', 'Add the correct name, not change the name', 'Tell the guest names are philosophical illusions', 'Create a price review ticket'],
    answerIndex: 1,
    explanation: 'Correct. Voice Matrix Row 9 says call the hotel and ask them to add the name, not change the name.',
    matrixInstruction: 'If Name: Call the hotel and ask them to add the name, not change the name.',
    slack: "YES - Only for same day check in's. NO SLACK FOR FUTURE DATES.", refundQueue: 'YES - for a voucher if rebooking', createTicket: 'NONE', supervisor: 'No', difficulty: 1, source: 'Voice Matrix Row 9'
  },
  {
    id: 'voice-10-dates', row: 10, category: 'Hotel & Reservation Issues',
    scenario: 'Incorrect dates / modifying dates', caller: 'The Time-Traveling Guest',
    rageLine: 'I booked Tuesday in 2026 but spiritually needed Thursday in 1956!',
    premise: 'The issue is incorrect dates on a prepaid booking. The Voice Matrix says to use voucher/rebooking logic, not simply edit dates.',
    question: 'What action fits the matrix best?',
    options: ['Change the old booking dates directly', 'Create a voucher via refund queue and rebook the guest', 'Tell the hotel to merge timelines', 'Only send a Slack message and do nothing else'],
    answerIndex: 1,
    explanation: 'Correct. Voice Matrix Row 10 says for prepaid incorrect dates: create a voucher via refund queue and rebook the guest. Ticket dropdown can be Price Review.',
    matrixInstruction: 'If dates issue: prepaid flow uses voucher via refund queue and rebooking.',
    slack: "YES - Only for same day check in's. NO SLACK FOR FUTURE DATES.", refundQueue: 'YES - for a voucher if rebooking', createTicket: 'Price review dropdown', supervisor: 'YES', difficulty: 2, source: 'Voice Matrix Row 10'
  },
  {
    id: 'voice-11-guests', row: 11, category: 'Hotel & Reservation Issues',
    scenario: 'Incorrect number of guests', caller: 'Captain Extra Pillow',
    rageLine: 'We have one room, four humans, and one emotional support typewriter!',
    premise: 'The property is in the USA and not a resort. The issue is guest count modification.',
    question: 'What does the matrix say to do first?',
    options: ['Call the front desk and have the hotel update it', 'Create Supplier Needs Support ticket', 'Immediately escalate to supervisor', 'Offer 15% for breakfast sadness'],
    answerIndex: 0,
    explanation: 'Correct. Voice Matrix Row 11 says if the property is in the USA and not a resort, call the front desk and have the hotel update it.',
    matrixInstruction: 'If USA and not resort: call front desk and have hotel update guest count.',
    slack: "YES - Only for same day check in's. NO SLACK FOR FUTURE DATES.", refundQueue: 'YES - for a voucher if rebooking', createTicket: 'NONE', supervisor: 'NO', difficulty: 2, source: 'Voice Matrix Row 11'
  },
  {
    id: 'voice-12-wrong-hotel', row: 12, category: 'Hotel & Reservation Issues',
    scenario: 'Wrong hotel booked / modifying to new hotel', caller: 'Sir Wrong Building',
    rageLine: 'I booked the hotel next to the hotel next to the hotel I wanted!',
    premise: 'The guest needs a different hotel. For prepaid, the Voice Matrix uses refund queue voucher and rebooking.',
    question: 'Which flow should the agent use?',
    options: ['Voucher via refund queue and rebook', 'Tell guest to sleep in the lobby of destiny', 'Only call the old hotel and ask them to teleport', 'Create Hotel Needs Support ticket'],
    answerIndex: 0,
    explanation: 'Correct. Voice Matrix Row 12 uses voucher via refund queue and rebooking for prepaid wrong hotel/new hotel cases.',
    matrixInstruction: 'Prepaid: create voucher via refund queue and rebook guest for new hotel.',
    slack: "YES - Only for same day check in's. NO SLACK FOR FUTURE DATES.", refundQueue: 'YES - for a voucher if rebooking', createTicket: 'Price review if new reservation was more and agent error', supervisor: 'NO', difficulty: 2, source: 'Voice Matrix Row 12'
  },
  {
    id: 'voice-13-shuttle', row: 13, category: 'Hotel & Reservation Issues',
    scenario: 'Shuttle not available', caller: 'Madame Missing Shuttle',
    rageLine: 'The shuttle disappeared and now my suitcase is learning philosophy!',
    premise: 'The shuttle is not available to get to the property.',
    question: 'What compensation does the matrix say to offer?',
    options: ['15% toward ordering Uber or Lyft and create refund request if accepted', '100% refund instantly', 'A handwritten apology from Bertrand Russell', 'Supervisor every time'],
    answerIndex: 0,
    explanation: 'Correct. Voice Matrix Row 13 says offer 15% compensation toward Uber/Lyft and create refund request if accepted.',
    matrixInstruction: 'Offer 15% compensation toward ordering UBER or LYFT and create refund request if accepted.',
    slack: 'NO', refundQueue: 'YES - If they accept 15% compensation', createTicket: 'NONE', supervisor: 'NO', difficulty: 1, source: 'Voice Matrix Row 13'
  },
  {
    id: 'voice-14-early-checkin', row: 14, category: 'Hotel & Reservation Issues',
    scenario: 'Early check-in / late check-out request', caller: 'Count Too-Early',
    rageLine: 'I arrived before breakfast and now time itself is offended!',
    premise: 'The guest requests early check-in or late check-out.',
    question: 'What should the agent do?',
    options: ['Call the hotel and make the request on behalf of the guest', 'Create refund queue immediately', 'Send Slack', 'Tell the guest to challenge the sun'],
    answerIndex: 0,
    explanation: 'Correct. Voice Matrix Row 14 says call the hotel and make the request on behalf of the guest.',
    matrixInstruction: 'Call the hotel and make the request on behalf of the guest.',
    slack: 'NO', refundQueue: 'NO', createTicket: 'NONE', supervisor: 'NO', difficulty: 1, source: 'Voice Matrix Row 14'
  },
  {
    id: 'voice-15-checkin-not-honored', row: 15, category: 'Hotel & Reservation Issues',
    scenario: 'Early check-in / late check-out not honored', caller: 'The Honored But Not Honored Guest',
    rageLine: 'The hotel promised time magic and delivered regular clocks!',
    premise: 'Early check-in or late check-out was not honored.',
    question: 'What does the matrix say?',
    options: ['Offer 15% compensation and create refund request if accepted', 'Call supplier only', 'Create legal complaint', 'Turn the phone into a sundial'],
    answerIndex: 0,
    explanation: 'Correct. Voice Matrix Row 15 says offer 15% compensation and create refund request in refund queue if accepted.',
    matrixInstruction: 'Offer 15% compensation and create refund request if accepted.',
    slack: 'NO', refundQueue: 'YES - If they accept 15% compensation', createTicket: 'NONE', supervisor: 'NO', difficulty: 1, source: 'Voice Matrix Row 15'
  },
  {
    id: 'voice-19-duplicate', row: 19, category: 'Hotel & Reservation Issues',
    scenario: 'Duplicate bookings made accidentally', caller: 'Double-Booked Daphne',
    rageLine: 'I have two reservations and only one physical body!',
    premise: 'The guest has duplicate bookings made accidentally.',
    question: 'What should the agent do?',
    options: ['Ask hotels to cancel duplicates and obtain FOC', 'Create a new duplicate to make it symmetrical', 'Only give 15%', 'Tell guest duplicates build character'],
    answerIndex: 0,
    explanation: 'Correct. Voice Matrix Row 19 says ask the hotels to cancel duplicates and obtain FOC.',
    matrixInstruction: 'Ask the hotels to cancel duplicates; call hotel and obtain FOC.',
    slack: 'NO', refundQueue: 'YES', createTicket: 'NONE', supervisor: 'NO', difficulty: 2, source: 'Voice Matrix Row 19'
  },
  {
    id: 'voice-20-room-type', row: 20, category: 'Hotel & Reservation Issues',
    scenario: 'Room type / bed type / accessibility not honored', caller: 'Bed-Type Bertrand',
    rageLine: 'The theorem promised two beds; reality produced one mattress and a crisis!',
    premise: 'Room type, bed type, or accessibility feature was not honored.',
    question: 'What should happen first?',
    options: ['Call hotel and ask them to move guest to appropriate room or resolve', 'Refund everything before asking hotel', 'Call philosopher zombie support', 'Create Needs Receipt ticket'],
    answerIndex: 0,
    explanation: 'Correct. Voice Matrix Row 20 says call the hotel and ask them to move the guest to the appropriate room or resolve.',
    matrixInstruction: 'Call hotel and ask them to move guest to appropriate room or resolve.',
    slack: "Yes - Only for same day check in's. NO SLACK FOR FUTURE DATES.", refundQueue: 'YES - for a voucher if rebooking', createTicket: 'NONE', supervisor: 'NO', difficulty: 2, source: 'Voice Matrix Row 20'
  },
  {
    id: 'voice-23-payment-again', row: 23, category: 'Hotel & Reservation Issues',
    scenario: 'Hotel requests payment again for prepaid booking', caller: 'Prepaid Polly',
    rageLine: 'The hotel wants money twice. My wallet is filing a complaint!',
    premise: 'The hotel requests payment again for a prepaid booking.',
    question: 'What is the first matrix action?',
    options: ['Call supplier to provide payment for the hotel', 'Tell guest to pay again and hope', 'Create refund queue right away', 'Offer 15% without checking payment'],
    answerIndex: 0,
    explanation: 'Correct. Voice Matrix Row 23 says call the supplier to provide payment for the hotel. If unresolved, ticket dropdown Hotel Needs Support.',
    matrixInstruction: 'Call Supplier to provide payment for the hotel. If unpaid/unresolved, ticket under Hotel Needs Support.',
    slack: 'YES', refundQueue: 'NO', createTicket: 'Yes - Drop Down Option "Hotel Needs Support" if unresolved', supervisor: 'NO', difficulty: 2, source: 'Voice Matrix Row 23'
  },
  {
    id: 'voice-27-refund-delay', row: 27, category: 'Hotel & Reservation Issues',
    scenario: 'Refund delays after cancellation or modification', caller: 'Refund Delay Ray',
    rageLine: 'My refund is moving slower than a vacuum tube warming up!',
    premise: 'The guest calls about refund delays after cancellation or modification.',
    question: 'What should the agent do?',
    options: ['Review and create a refund in the Refund Queue', 'Send Slack', 'Create Supplier Needs Support', 'Ask the guest to prove existence'],
    answerIndex: 0,
    explanation: 'Correct. Voice Matrix Row 27 says review and create a refund in the Refund Queue.',
    matrixInstruction: 'Review and Create a Refund in the Refund Queue.',
    slack: 'NO', refundQueue: 'YES', createTicket: 'NONE', supervisor: 'NO', difficulty: 1, source: 'Voice Matrix Row 27'
  },
  {
    id: 'voice-29-refund-tool-broken', row: 29, category: 'Hotel & Reservation Issues',
    scenario: 'Unable to create refund in refund queue', caller: 'Broken Button Bob',
    rageLine: 'The refund tool has left the building!',
    premise: 'The refund tool is not working and the agent is unable to create a refund.',
    question: 'What support path is allowed by matrix?',
    options: ['Slack yes and supervisor yes', 'No Slack ever', 'Only create Needs Receipt', 'Offer 15% to the computer'],
    answerIndex: 0,
    explanation: 'Correct. Voice Matrix Row 29 shows Slack YES and Supervisor YES when the refund tool is not working.',
    matrixInstruction: 'Refund tool is not working.',
    slack: 'YES', refundQueue: 'NO', createTicket: 'NONE', supervisor: 'YES', difficulty: 2, source: 'Voice Matrix Row 29'
  },
  {
    id: 'voice-31-hotel-calls', row: 31, category: 'Supplier, Hotel, and Group Calls',
    scenario: 'Hotel calls', caller: 'Hotelier Harold',
    rageLine: 'I am a hotel and I demand operator enlightenment!',
    premise: 'A hotel calls and needs support or wants to speak with someone.',
    question: 'Which ticket dropdown is correct?',
    options: ['Hotel Needs Support', 'Supplier Needs Support', 'Needs Receipt', 'Price Review'],
    answerIndex: 0,
    explanation: 'Correct. Voice Matrix Row 31 says create a ticket under Hotel Needs Support.',
    matrixInstruction: 'Create a ticket under Hotel Needs Support if they wish to speak with someone.',
    slack: 'No', refundQueue: 'No', createTicket: 'Yes - Drop Down Option "Hotel Needs Support"', supervisor: 'No', difficulty: 1, source: 'Voice Matrix Row 31'
  },
  {
    id: 'voice-32-supplier-calls', row: 32, category: 'Supplier, Hotel, and Group Calls',
    scenario: 'Supplier calls', caller: 'Supplier Screamington',
    rageLine: 'I bring supplier energy and several unresolved syllogisms!',
    premise: 'A supplier calls for review/support.',
    question: 'Which ticket dropdown is correct?',
    options: ['Supplier Needs Support', 'Hotel Needs Support', 'Refund Protection Plan', 'Legal Complaint'],
    answerIndex: 0,
    explanation: 'Correct. Voice Matrix Row 32 says create a ticket under Supplier Needs Support.',
    matrixInstruction: 'Create a ticket for review under Supplier Needs Support.',
    slack: 'No', refundQueue: 'No', createTicket: 'Yes - Drop Down Option "Supplier Needs Support"', supervisor: 'No', difficulty: 1, source: 'Voice Matrix Row 32'
  },
  {
    id: 'voice-33-group-client', row: 33, category: 'Supplier, Hotel, and Group Calls',
    scenario: 'Group client cannot reach assigned planner', caller: 'Group Block Gloria',
    rageLine: 'My planner vanished into the group-block dimension!',
    premise: 'A group client is unable to contact the assigned agent/planner for their group request.',
    question: 'What does the Voice Matrix allow?',
    options: ['Slack yes', 'Refund queue yes', 'Create ticket always', 'Supervisor yes always'],
    answerIndex: 0,
    explanation: 'Correct. Voice Matrix Row 33 shows Slack YES, with no refund queue and no ticket listed.',
    matrixInstruction: 'Client unable to contact assigned/planner for Group Request.',
    slack: 'Yes', refundQueue: 'No', createTicket: 'NONE', supervisor: 'No', difficulty: 2, source: 'Voice Matrix Row 33'
  },
  {
    id: 'voice-35-cancel-refundable', row: 35, category: 'Cancellation & Confirmations',
    scenario: 'Cancelling refundable room', caller: 'Refundable Rita',
    rageLine: 'My room is refundable and my patience is non-refundable!',
    premise: 'A guest wants to cancel a refundable room.',
    question: 'What should the agent do?',
    options: ['Select cancel and confirm cancellation', 'Create legal complaint', 'Always call supplier first', 'Tell guest refundable means emotionally refundable'],
    answerIndex: 0,
    explanation: 'Correct. Voice Matrix Row 35 says select cancel and confirm cancellation. Refund queue if not processed automatically.',
    matrixInstruction: 'If guest requests to cancel refundable room, select cancel and confirm cancellation.',
    slack: 'NO', refundQueue: 'YES - if not processed automatically', createTicket: 'NONE', supervisor: 'NO', difficulty: 1, source: 'Voice Matrix Row 35'
  },
  {
    id: 'voice-36-cancel-nonref', row: 36, category: 'Cancellation & Confirmations',
    scenario: 'Cancelling non-refundable room', caller: 'NonRefundable Ned',
    rageLine: 'My booking says no refund but my soul says maybe!',
    premise: 'A guest requests to cancel a non-refundable room type.',
    question: 'What tool may be used when applicable?',
    options: ['Refund Queue when applicable', 'Slack always', 'Needs Receipt ticket', 'Delete the policy from memory'],
    answerIndex: 0,
    explanation: 'Correct. Voice Matrix Row 36 says Refund Queue YES when applicable for cancelling non-refundable room types.',
    matrixInstruction: 'For non-refundable cancellation, follow applicable reasons/process and use refund queue when applicable.',
    slack: 'NO', refundQueue: 'YES - when applicable', createTicket: 'NONE', supervisor: 'NO', difficulty: 2, source: 'Voice Matrix Row 36'
  },
  {
    id: 'voice-39-confirm-email', row: 39, category: 'Cancellation & Confirmations',
    scenario: 'Confirmation email not received', caller: 'Inbox Inspector Irene',
    rageLine: 'My confirmation email fell into the spam abyss!',
    premise: 'The guest needs a copy of the confirmation email.',
    question: 'What should the agent confirm?',
    options: ['Confirm the guest email address and resend/provide confirmation', 'Create refund queue', 'Call supplier', 'Send Slack to the email gremlins'],
    answerIndex: 0,
    explanation: 'Correct. Voice Matrix Row 39 says confirm the email address if the guest needs a copy of their confirmation.',
    matrixInstruction: 'If guest needs confirmation, confirm their email address.',
    slack: 'NO', refundQueue: 'NO', createTicket: 'NONE', supervisor: 'NO', difficulty: 1, source: 'Voice Matrix Row 39'
  },
  {
    id: 'voice-40-manager', row: 40, category: 'Cancellation & Confirmations',
    scenario: 'Guest wants manager due to unclear timeline', caller: 'Manager-Demanding Mortimer',
    rageLine: 'I demand a manager, a timeline, and possibly a sandwich!',
    premise: 'The guest wants to speak with a manager because of delayed or unclear resolution timelines.',
    question: 'What email should be provided according to the matrix?',
    options: ['VIPRES@HotelPlanner.com', 'Reservations@HotelPlanner.com', 'Refunds@HotelPlanner.com', 'PhilosophyZombie@Logic.net'],
    answerIndex: 0,
    explanation: 'Correct. Voice Matrix Row 40 says if guest wishes to speak with a manager, ask them to email VIPRES@HotelPlanner.com.',
    matrixInstruction: 'If guest wishes to speak with manager, ask them to email VIPRES@HotelPlanner.com.',
    slack: 'NO', refundQueue: 'NO', createTicket: 'NONE', supervisor: 'YES', difficulty: 2, source: 'Voice Matrix Row 40'
  },
  {
    id: 'voice-42-final-charges', row: 42, category: 'Post Stay Issues',
    scenario: 'Incorrect final charges', caller: 'Receipt-Rage Regina',
    rageLine: 'The final charges look like a theorem exploded on my card!',
    premise: 'The guest has incorrect final charges after stay.',
    question: 'What should the guest forward?',
    options: ['Receipt with itinerary to Reservations@HotelPlanner.com', 'Nothing; just scream politely', 'A hand-drawn truth table', 'A new reservation'],
    answerIndex: 0,
    explanation: 'Correct. Voice Matrix Row 42 says advise guest to forward the receipt with itinerary to Reservations@HotelPlanner.com.',
    matrixInstruction: 'Advise guest to forward receipt along with itinerary to Reservations@HotelPlanner.com.',
    slack: 'NO', refundQueue: 'NO', createTicket: 'NONE', supervisor: 'NO', difficulty: 2, source: 'Voice Matrix Row 42'
  },
  {
    id: 'voice-45-internal-receipt', row: 45, category: 'Post Stay Issues',
    scenario: 'Hotel provided internal receipt', caller: 'Internal Receipt Ivan',
    rageLine: 'The hotel gave me a secret receipt from the backrooms!',
    premise: 'The hotel gave the guest an internal receipt.',
    question: 'What should the client do?',
    options: ['Email receipt to Reservations@HotelPlanner.com', 'Create Slack', 'Open refund queue immediately', 'Call Bertrand Russell'],
    answerIndex: 0,
    explanation: 'Correct. Voice Matrix Row 45 says ask client to email the receipt to Reservations@HotelPlanner.com.',
    matrixInstruction: 'Ask client to email receipt to Reservations@HotelPlanner.com.',
    slack: 'NO', refundQueue: 'NO', createTicket: 'NONE', supervisor: 'NO', difficulty: 1, source: 'Voice Matrix Row 45'
  },
  {
    id: 'voice-46-receipt', row: 46, category: 'Post Stay Issues',
    scenario: 'Needs receipt or invoice', caller: 'Invoice Igor',
    rageLine: 'I need a receipt before my accounting department becomes sentient!',
    premise: 'The guest needs a receipt or invoice.',
    question: 'Which ticket dropdown may apply for option 2?',
    options: ['Needs Receipt', 'Hotel Needs Support', 'Supplier Needs Support', 'Price Review'],
    answerIndex: 0,
    explanation: 'Correct. Voice Matrix Row 46 lists Create Ticket: Needs Receipt for option 2.',
    matrixInstruction: 'If guest needs confirmation copy, confirm email; option 2 may use Needs Receipt ticket.',
    slack: 'NO', refundQueue: 'NO', createTicket: 'Yes - Drop Down Option "Needs Receipt" for option 2', supervisor: 'NO', difficulty: 2, source: 'Voice Matrix Row 46'
  },
  {
    id: 'voice-49-early-departure', row: 49, category: 'Post Stay Issues',
    scenario: 'Early departure after check-in', caller: 'Early Exit Eddie',
    rageLine: 'I left early and now the bill is giving me side-eye!',
    premise: 'Guest departed early after check-in. The matrix starts by checking whether the property was notified or approved it.',
    question: 'What should the agent ask first?',
    options: ['Ask if guest notified property or received approval from property', 'Refund immediately', 'Create legal complaint', 'Tell guest to return to the hotel backwards'],
    answerIndex: 0,
    explanation: 'Correct. Voice Matrix Row 49 says first ask whether the guest notified the property or received approval.',
    matrixInstruction: 'Ask if guest notified property or received approval from property.',
    slack: 'NO', refundQueue: 'YES', createTicket: 'NONE', supervisor: 'NO', difficulty: 3, source: 'Voice Matrix Row 49'
  },
  {
    id: 'voice-50-refund-protection', row: 50, category: 'Post Stay Issues',
    scenario: 'Refund Protection Plan refund', caller: 'Protection Plan Percy',
    rageLine: 'I bought protection and now I need protection from the protection!',
    premise: 'The guest asks for the Refund Protection Plan to be cancelled/refunded.',
    question: 'Which matrix area handles it?',
    options: ['Refund Queue process', 'Supplier call only', 'Hotel Needs Support ticket', 'No action allowed'],
    answerIndex: 0,
    explanation: 'Correct. Voice Matrix Row 50 points to cancelling/refunding the plan and shows Refund Queue YES.',
    matrixInstruction: 'If guest requests this plan to be cancelled/refunded, follow plan cancellation/refund process.',
    slack: 'NO', refundQueue: 'YES', createTicket: 'NONE', supervisor: 'NO', difficulty: 2, source: 'Voice Matrix Row 50'
  },
  {
    id: 'voice-52-call-review', row: 52, category: 'Post Stay Issues',
    scenario: 'Call Review Needed', caller: 'Quality Ghost Quentin',
    rageLine: 'This call needs review before my headset becomes haunted!',
    premise: 'A call review is needed.',
    question: 'Where should it be moved or emailed?',
    options: ['Move to VIPRES / email VIPRESsupport@HotelPlanner.com on side conversation', 'Create refund queue', 'Send Slack', 'Needs Receipt dropdown'],
    answerIndex: 0,
    explanation: 'Correct. Voice Matrix Row 52 says move these to VIPRES or email VIPRESsupport@HotelPlanner.com on side conversation.',
    matrixInstruction: 'Move these over to VIPRES / Email VIPRESsupport@HotelPlanner.com on side conversation.',
    slack: 'NO', refundQueue: 'NO', createTicket: 'NO', supervisor: 'NO', difficulty: 3, source: 'Voice Matrix Row 52'
  }
]

const es: Puzzle[] = en.map((p) => ({ ...p }))
es.forEach((p) => {
  const map: Record<string, Partial<Puzzle>> = {
    'voice-07-res-not-found': {
      scenario: 'Reserva no encontrada en el check-in', caller: 'Profesor Botón de Pánico',
      rageLine: '¡El huésped está en el lobby y mis tubos lógicos están sudando!',
      premise: 'La reserva no aparece en el check-in. La Voice Matrix dice llamar primero al proveedor. Si el proveedor no confirma en 20 minutos, crear ticket.',
      question: '¿Cuál es el primer movimiento correcto?',
      options: ['Crear ticket inmediatamente y esconderse debajo del escritorio', 'Llamar primero al proveedor', 'Enviar Slack para cada reserva futura', 'Ofrecer desayuno gratis al azar'],
      explanation: 'Correcto. Voice Matrix Fila 7: llama primero al proveedor; si no confirma en 20 minutos, crea ticket. Slack solo para check-in del mismo día.',
      matrixInstruction: '1. Llamar al proveedor. 2. Si el proveedor no confirma en 20 minutos, crear ticket.'
    },
    'voice-08-overbooking': {
      scenario: 'Sobreventa / reubicación / hotel cerrado', caller: 'Dr. Reserva Caminada',
      rageLine: '¡El hotel desapareció como un teorema en una licuadora!',
      premise: 'El huésped fue reubicado por sobreventa o el hotel está cerrado. La Voice Matrix da un tiempo de espera más corto.',
      question: 'Después de llamar al proveedor, ¿cuánto esperas antes de tomar acción de ticket si no se resuelve?',
      options: ['10 minutos', '20 minutos', 'Hasta que el teléfono tenga conciencia propia', 'Nunca crear nada'],
      explanation: 'Correcto. Voice Matrix Fila 8 dice llamar al proveedor; si no confirma en 10 minutos, crear la siguiente acción. Slack solo mismo día.',
      matrixInstruction: '1. Llamar al proveedor. 2. Si el proveedor no confirma en 10 minutos, crear ticket.'
    },
    'voice-09-name': {
      scenario: 'Nombre incorrecto / modificar nombre', caller: 'Señorita Typo Von Teclado',
      rageLine: '¡El nombre del huésped está mal y recepción está juzgando mis vocales!',
      premise: 'El nombre del huésped es incorrecto. La Voice Matrix advierte no cambiar el nombre directamente.',
      question: '¿Qué debe pedir el agente al hotel?',
      options: ['Borrar la reserva y prender una fogata', 'Agregar el nombre correcto, no cambiar el nombre', 'Decir que los nombres son ilusiones filosóficas', 'Crear ticket de Price Review'],
      explanation: 'Correcto. Voice Matrix Fila 9 dice llamar al hotel y pedir que agreguen el nombre, no que cambien el nombre.',
      matrixInstruction: 'Si es nombre: llamar al hotel y pedir que agreguen el nombre, no que lo cambien.'
    },
    'voice-10-dates': {
      scenario: 'Fechas incorrectas / modificar fechas', caller: 'El Huésped Viajero del Tiempo',
      rageLine: '¡Reservé martes en 2026 pero espiritualmente necesitaba jueves en 1956!',
      premise: 'El problema son fechas incorrectas en una reserva prepagada. La Voice Matrix usa voucher/rebooking, no simplemente editar fechas.',
      question: '¿Qué acción encaja mejor con la matrix?',
      options: ['Cambiar directamente las fechas de la reserva vieja', 'Crear voucher por refund queue y rebookear al huésped', 'Pedir al hotel que una las líneas de tiempo', 'Solo enviar Slack y no hacer nada más'],
      explanation: 'Correcto. Voice Matrix Fila 10 dice que para fechas incorrectas prepaid: crear voucher por refund queue y rebookear.',
      matrixInstruction: 'Si el problema es fechas: el flujo prepaid usa voucher por refund queue y rebooking.'
    },
    'voice-11-guests': {
      scenario: 'Número incorrecto de huéspedes', caller: 'Capitán Almohada Extra',
      rageLine: '¡Tenemos una habitación, cuatro humanos y una máquina de escribir emocional!',
      premise: 'La propiedad está en EE. UU. y no es resort. El problema es modificar la cantidad de huéspedes.',
      question: '¿Qué dice la matrix que se debe hacer primero?',
      options: ['Llamar a recepción y pedir que el hotel lo actualice', 'Crear ticket Supplier Needs Support', 'Escalar inmediatamente a supervisor', 'Ofrecer 15% por tristeza de desayuno'],
      explanation: 'Correcto. Voice Matrix Fila 11 dice que si la propiedad está en EE. UU. y no es resort, llama a recepción y pide que el hotel actualice.',
      matrixInstruction: 'Si es EE. UU. y no resort: llamar a recepción y pedir que el hotel actualice la cantidad de huéspedes.'
    },
    'voice-12-wrong-hotel': {
      scenario: 'Hotel incorrecto reservado / cambiar a nuevo hotel', caller: 'Señor Edificio Equivocado',
      rageLine: '¡Reservé el hotel al lado del hotel al lado del hotel que quería!',
      premise: 'El huésped necesita un hotel diferente. Para prepaid, la Voice Matrix usa voucher en refund queue y rebooking.',
      question: '¿Qué flujo debe usar el agente?',
      options: ['Voucher por refund queue y rebooking', 'Decir al huésped que duerma en el lobby del destino', 'Solo llamar al hotel viejo y pedir teleportación', 'Crear ticket Hotel Needs Support'],
      explanation: 'Correcto. Voice Matrix Fila 12 usa voucher por refund queue y rebooking para hotel incorrecto/nuevo hotel prepaid.',
      matrixInstruction: 'Prepaid: crear voucher por refund queue y rebookear al huésped en el nuevo hotel.'
    },
    'voice-13-shuttle': {
      scenario: 'Shuttle no disponible', caller: 'Madame Sin Shuttle',
      rageLine: '¡El shuttle desapareció y ahora mi maleta estudia filosofía!',
      premise: 'El shuttle no está disponible para llegar a la propiedad.',
      question: '¿Qué compensación dice la matrix que se debe ofrecer?',
      options: ['15% para Uber o Lyft y crear refund request si acepta', '100% de reembolso inmediato', 'Una disculpa escrita a mano por Bertrand Russell', 'Supervisor siempre'],
      explanation: 'Correcto. Voice Matrix Fila 13 dice ofrecer 15% hacia Uber/Lyft y crear refund request si acepta.',
      matrixInstruction: 'Ofrecer 15% de compensación para pedir UBER o LYFT y crear refund request si acepta.'
    },
    'voice-14-early-checkin': {
      scenario: 'Solicitud de early check-in / late check-out', caller: 'Conde Demasiado Temprano',
      rageLine: '¡Llegué antes del desayuno y ahora el tiempo está ofendido!',
      premise: 'El huésped solicita early check-in o late check-out.',
      question: '¿Qué debe hacer el agente?',
      options: ['Llamar al hotel y hacer la solicitud por el huésped', 'Crear refund queue inmediatamente', 'Enviar Slack', 'Decir al huésped que desafíe al sol'],
      explanation: 'Correcto. Voice Matrix Fila 14 dice llamar al hotel y hacer la solicitud en nombre del huésped.',
      matrixInstruction: 'Llamar al hotel y hacer la solicitud en nombre del huésped.'
    },
    'voice-15-checkin-not-honored': {
      scenario: 'Early check-in / late check-out no honrado', caller: 'El Huésped Honrado Pero No Honrado',
      rageLine: '¡El hotel prometió magia del tiempo y entregó relojes normales!',
      premise: 'El early check-in o late check-out no fue honrado.',
      question: '¿Qué dice la matrix?',
      options: ['Ofrecer 15% de compensación y crear refund request si acepta', 'Solo llamar al proveedor', 'Crear queja legal', 'Convertir el teléfono en reloj solar'],
      explanation: 'Correcto. Voice Matrix Fila 15 dice ofrecer 15% y crear refund request en refund queue si acepta.',
      matrixInstruction: 'Ofrecer 15% de compensación y crear refund request si acepta.'
    },
    'voice-19-duplicate': {
      scenario: 'Reservas duplicadas por accidente', caller: 'Daphne Doble Reserva',
      rageLine: '¡Tengo dos reservas y solo un cuerpo físico!',
      premise: 'El huésped tiene reservas duplicadas hechas accidentalmente.',
      question: '¿Qué debe hacer el agente?',
      options: ['Pedir a los hoteles cancelar duplicados y obtener FOC', 'Crear un nuevo duplicado para simetría', 'Solo dar 15%', 'Decir que los duplicados forman carácter'],
      explanation: 'Correcto. Voice Matrix Fila 19 dice contactar a los hoteles para cancelar duplicados y obtener FOC.',
      matrixInstruction: 'Pedir al hotel cancelar duplicados y obtener FOC cuando corresponda.'
    },
    'voice-20-room-type': {
      scenario: 'Tipo de habitación incorrecto', caller: 'Ralph Habitación Equivocada',
      rageLine: '¡Pedí una cama y recibí una crisis existencial con almohadas!',
      premise: 'El tipo de habitación no coincide con lo reservado.',
      question: '¿Qué debe intentar primero el agente?',
      options: ['Llamar al hotel y pedir que muevan al huésped a la habitación correcta o resuelvan', 'Reembolsar todo antes de preguntar al hotel', 'Llamar soporte de zombies filósofos', 'Crear ticket Needs Receipt'],
      explanation: 'Correcto. Voice Matrix Fila 20 empieza con llamar al hotel para mover al huésped al tipo correcto o resolver.',
      matrixInstruction: 'Llamar al hotel y pedir que muevan al huésped a la habitación correcta o resuelvan el problema.'
    },
    'voice-23-payment-again': {
      scenario: 'Hotel pide pago al huésped otra vez', caller: 'Paula Paga-Doble',
      rageLine: '¡El hotel quiere mi dinero otra vez y mi billetera está testificando contra mí!',
      premise: 'El hotel está pidiendo al huésped que pague aunque la reserva ya fue pagada.',
      question: '¿Qué debe hacer el agente primero?',
      options: ['Llamar al proveedor para que proporcione pago al hotel', 'Decir al huésped que pague otra vez y espere', 'Crear refund queue de inmediato', 'Ofrecer 15% sin revisar pago'],
      explanation: 'Correcto. Voice Matrix Fila 23 dice llamar al proveedor para que proporcione pago al hotel; si no se resuelve, puede aplicar Hotel Needs Support.',
      matrixInstruction: 'Llamar al proveedor para que proporcione pago al hotel.'
    },
    'voice-27-refund-delay': {
      scenario: 'Reembolso retrasado / pendiente', caller: 'Debbie Reembolso Retrasado',
      rageLine: '¡Mi reembolso está en algún lugar entre aquí y Narnia contable!',
      premise: 'El huésped llama por un reembolso retrasado o pendiente.',
      question: '¿Qué herramienta debe usar el agente?',
      options: ['Revisar y crear un reembolso en Refund Queue', 'Enviar Slack', 'Crear Supplier Needs Support', 'Pedir al huésped que pruebe su existencia'],
      explanation: 'Correcto. Voice Matrix Fila 27 apunta a revisar y crear el reembolso en Refund Queue cuando corresponda.',
      matrixInstruction: 'Revisar estado y usar Refund Queue cuando corresponda.'
    },
    'voice-29-refund-tool-broken': {
      scenario: 'Herramienta de reembolso no funciona', caller: 'Tina Herramienta Rota',
      rageLine: '¡La herramienta se rompió y ahora el servidor está hablando en latín!',
      premise: 'El agente no puede procesar usando la herramienta de reembolso.',
      question: '¿Qué combinación permite la matrix?',
      options: ['Slack sí y supervisor sí', 'Nunca Slack', 'Solo Needs Receipt', 'Ofrecer 15% a la computadora'],
      explanation: 'Correcto. Voice Matrix Fila 29 muestra Slack YES y Supervisor YES para esta situación.',
      matrixInstruction: 'Cuando la herramienta de reembolso no funciona, escalar según el flujo indicado.'
    },
    'voice-31-hotel-calls': {
      scenario: 'Llamada del hotel', caller: 'Hotel Harold',
      rageLine: '¡Soy un hotel y exijo iluminación operacional!',
      premise: 'Un hotel llama pidiendo ayuda o revisión.',
      question: '¿Qué dropdown de ticket es correcto?',
      options: ['Hotel Needs Support', 'Supplier Needs Support', 'Needs Receipt', 'Price Review'],
      explanation: 'Correcto. Voice Matrix Fila 31 dice crear ticket en Hotel Needs Support.',
      matrixInstruction: 'Crear ticket usando Hotel Needs Support cuando aplique.'
    },
    'voice-32-supplier-calls': {
      scenario: 'Llamada del proveedor', caller: 'Proveedor Screamington',
      rageLine: '¡Traigo energía de proveedor y varios silogismos sin resolver!',
      premise: 'Un proveedor llama con un asunto que necesita revisión.',
      question: '¿Qué dropdown de ticket es correcto?',
      options: ['Supplier Needs Support', 'Hotel Needs Support', 'Refund Protection Plan', 'Legal Complaint'],
      explanation: 'Correcto. Voice Matrix Fila 32 dice crear ticket bajo Supplier Needs Support.',
      matrixInstruction: 'Crear ticket para revisión bajo Supplier Needs Support.'
    },
    'voice-33-group-client': {
      scenario: 'Cliente de grupo no puede contactar al planner asignado', caller: 'Gloria Bloque de Grupo',
      rageLine: '¡Mi planner desapareció en la dimensión de group blocks!',
      premise: 'Un cliente de grupo no puede contactar al agente/planner asignado para su solicitud de grupo.',
      question: '¿Qué permite la Voice Matrix?',
      options: ['Slack sí', 'Refund queue sí', 'Crear ticket siempre', 'Supervisor sí siempre'],
      explanation: 'Correcto. Voice Matrix Fila 33 muestra Slack YES, sin refund queue y sin ticket listado.',
      matrixInstruction: 'Cliente no puede contactar al asignado/planner para Group Request.'
    },
    'voice-35-cancel-refundable': {
      scenario: 'Cancelar habitación reembolsable', caller: 'Rita Reembolsable',
      rageLine: '¡Mi habitación es reembolsable y mi paciencia no lo es!',
      premise: 'Un huésped quiere cancelar una habitación reembolsable.',
      question: '¿Qué debe hacer el agente?',
      options: ['Seleccionar cancel y confirmar la cancelación', 'Crear queja legal', 'Siempre llamar primero al proveedor', 'Decir que refundable significa emocionalmente refundable'],
      explanation: 'Correcto. Voice Matrix Fila 35 dice seleccionar cancel y confirmar la cancelación. Refund queue si no se procesa automáticamente.',
      matrixInstruction: 'Si el huésped pide cancelar una habitación reembolsable, seleccionar cancel y confirmar cancelación.'
    },
    'voice-36-cancel-nonref': {
      scenario: 'Cancelar habitación no reembolsable', caller: 'Ned No Reembolsable',
      rageLine: '¡Mi reserva dice no refund pero mi alma dice tal vez!',
      premise: 'Un huésped solicita cancelar una habitación no reembolsable.',
      question: '¿Qué herramienta puede usarse cuando aplique?',
      options: ['Refund Queue cuando aplique', 'Slack siempre', 'Ticket Needs Receipt', 'Borrar la política de la memoria'],
      explanation: 'Correcto. Voice Matrix Fila 36 dice Refund Queue YES cuando aplique para cancelar habitaciones no reembolsables.',
      matrixInstruction: 'Para cancelación no reembolsable, seguir razones/proceso aplicable y usar refund queue cuando aplique.'
    },
    'voice-39-confirm-email': {
      scenario: 'Email de confirmación no recibido', caller: 'Inspectora del Inbox Irene',
      rageLine: '¡Mi email de confirmación cayó al abismo del spam!',
      premise: 'El huésped necesita copia del email de confirmación.',
      question: '¿Qué debe confirmar el agente?',
      options: ['Confirmar el email del huésped y reenviar/proveer confirmación', 'Crear refund queue', 'Llamar al proveedor', 'Enviar Slack a los duendes del email'],
      explanation: 'Correcto. Voice Matrix Fila 39 dice confirmar la dirección de email si el huésped necesita copia de su confirmación.',
      matrixInstruction: 'Si el huésped necesita confirmación, confirmar su dirección de email.'
    },
    'voice-40-manager': {
      scenario: 'Huésped quiere gerente por timeline poco clara', caller: 'Mortimer Quiero-Gerente',
      rageLine: '¡Exijo un gerente, una timeline y posiblemente un sándwich!',
      premise: 'El huésped quiere hablar con un gerente por demoras o timeline poco clara.',
      question: '¿Qué email debe proveerse según la matrix?',
      options: ['VIPRES@HotelPlanner.com', 'Reservations@HotelPlanner.com', 'Refunds@HotelPlanner.com', 'PhilosophyZombie@Logic.net'],
      explanation: 'Correcto. Voice Matrix Fila 40 dice que si el huésped quiere hablar con un gerente, debe enviar email a VIPRES@HotelPlanner.com.',
      matrixInstruction: 'Si el huésped quiere hablar con gerente, pedir que envíe email a VIPRES@HotelPlanner.com.'
    },
    'voice-42-final-charges': {
      scenario: 'Cargos finales incorrectos', caller: 'Regina Rabia-de-Recibo',
      rageLine: '¡Los cargos finales parecen un teorema explotado en mi tarjeta!',
      premise: 'El huésped tiene cargos finales incorrectos después de la estadía.',
      question: '¿Qué debe enviar el huésped?',
      options: ['Recibo con itinerario a Reservations@HotelPlanner.com', 'Nada; solo gritar educadamente', 'Una truth table dibujada a mano', 'Una nueva reserva'],
      explanation: 'Correcto. Voice Matrix Fila 42 dice indicar al huésped que envíe el recibo con itinerario a Reservations@HotelPlanner.com.',
      matrixInstruction: 'Indicar al huésped que envíe recibo junto con itinerario a Reservations@HotelPlanner.com.'
    },
    'voice-45-internal-receipt': {
      scenario: 'Hotel dio recibo interno', caller: 'Iván Recibo Interno',
      rageLine: '¡El hotel me dio un recibo secreto de los backrooms!',
      premise: 'El hotel le dio al huésped un recibo interno.',
      question: '¿Qué debe hacer el cliente?',
      options: ['Enviar recibo a Reservations@HotelPlanner.com', 'Crear Slack', 'Abrir refund queue inmediatamente', 'Llamar a Bertrand Russell'],
      explanation: 'Correcto. Voice Matrix Fila 45 dice pedir al cliente que envíe el recibo a Reservations@HotelPlanner.com.',
      matrixInstruction: 'Pedir al cliente que envíe el recibo a Reservations@HotelPlanner.com.'
    },
    'voice-46-receipt': {
      scenario: 'Necesita recibo o invoice', caller: 'Igor Invoice',
      rageLine: '¡Necesito un recibo antes de que contabilidad se vuelva consciente!',
      premise: 'El huésped necesita recibo o invoice.',
      question: '¿Qué dropdown de ticket puede aplicar para la opción 2?',
      options: ['Needs Receipt', 'Hotel Needs Support', 'Supplier Needs Support', 'Price Review'],
      explanation: 'Correcto. Voice Matrix Fila 46 lista Create Ticket: Needs Receipt para la opción 2.',
      matrixInstruction: 'Si el huésped necesita copia de confirmación, confirmar email; la opción 2 puede usar ticket Needs Receipt.'
    },
    'voice-49-early-departure': {
      scenario: 'Salida anticipada después del check-in', caller: 'Eddie Salida Temprana',
      rageLine: '¡Me fui temprano y ahora la factura me mira mal!',
      premise: 'El huésped se fue temprano después del check-in. La matrix empieza revisando si notificó o recibió aprobación de la propiedad.',
      question: '¿Qué debe preguntar primero el agente?',
      options: ['Preguntar si el huésped notificó a la propiedad o recibió aprobación', 'Reembolsar inmediatamente', 'Crear queja legal', 'Decir al huésped que vuelva al hotel caminando hacia atrás'],
      explanation: 'Correcto. Voice Matrix Fila 49 dice preguntar primero si el huésped notificó a la propiedad o recibió aprobación.',
      matrixInstruction: 'Preguntar si el huésped notificó a la propiedad o recibió aprobación de la propiedad.'
    },
    'voice-50-refund-protection': {
      scenario: 'Reembolso de Refund Protection Plan', caller: 'Percy Plan de Protección',
      rageLine: '¡Compré protección y ahora necesito protección de la protección!',
      premise: 'El huésped pide cancelar/reembolsar el Refund Protection Plan.',
      question: '¿Qué área de la matrix lo maneja?',
      options: ['Proceso de Refund Queue', 'Solo llamada al proveedor', 'Ticket Hotel Needs Support', 'No se permite ninguna acción'],
      explanation: 'Correcto. Voice Matrix Fila 50 apunta a cancelar/reembolsar el plan y muestra Refund Queue YES.',
      matrixInstruction: 'Si el huésped pide cancelar/reembolsar este plan, seguir el proceso de cancelación/reembolso del plan.'
    },
    'voice-52-call-review': {
      scenario: 'Call Review necesario', caller: 'Quentin Fantasma de Calidad',
      rageLine: '¡Esta llamada necesita revisión antes de que mi headset quede embrujado!',
      premise: 'Se necesita revisión de llamada.',
      question: '¿A dónde debe moverse o enviarse?',
      options: ['Mover a VIPRES / enviar email a VIPRESsupport@HotelPlanner.com en side conversation', 'Crear refund queue', 'Enviar Slack', 'Dropdown Needs Receipt'],
      explanation: 'Correcto. Voice Matrix Fila 52 dice mover estos casos a VIPRES o enviar email a VIPRESsupport@HotelPlanner.com en side conversation.',
      matrixInstruction: 'Mover estos casos a VIPRES / Email VIPRESsupport@HotelPlanner.com en side conversation.'
    }
  }
  Object.assign(p, map[p.id] || {})
})

export const puzzlesByLanguage: Record<Language, Puzzle[]> = { en, es }

export function getPuzzles(language: Language): Puzzle[] {
  return puzzlesByLanguage[language]
}
