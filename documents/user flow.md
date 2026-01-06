STORYBOARD: PRV8 / VAL8 EMBEDDED IFRAME & WIDGET
HIGH-LEVEL STRUCTURE
User clicks CTA on partner site → PRV8 iframe loads → VAL8 collects context → VAL8 surfaces curated options → user books → confirmation → optional concierge.
All within a lightweight, premium, conversational UI.

📍 FRAME 1: Partner CTA
Scene: Partner website (Visa, Aspire, GoRentals, Tourism Board).
Moment: User sees a curated CTA tile or contextual CTA.
On-screen UI examples:
“Plan Your Trip with Your Personal Travel Concierge”


“Discover Luxury Hotels Tailored to You”


“Book With Exclusive Cardholder Benefits”


User Action: Click CTA.
Note:
CTA design should feel elevated, not retail.

📍 FRAME 2: Iframe Loader (Embedded)
Purpose:
Build confidence, communicate luxury quality, hide initialization.
On-screen UI:
Full screen or framed container


Partner logo or PRV8 co-brand


Soft animation pulse, not a spinner


Copy:
“Preparing your concierge experience…”
Design Tone:
Quiet luxury


Minimal, no clutter


Outcome: Load in < 2 seconds.

📍 FRAME 3: Welcome / Intent Capture
Purpose:
Low-friction entry point to conversation.
UI:
Hero headline:

 “Where are you thinking of going?”


Optional quick actions:
Plan a Trip


Explore Ideas


I’m Traveling Now


Just Browsing


Text Input Placeholder:
“Tell me anything…”
AI Off-Screen System Behavior:
Start new session


Set partner theme


Prime VAL8 context



📍 FRAME 4: User Sends First Message
Example Input:
“I want to go to Dubai in December.”
VAL8 Response:
“Beautiful choice. Dubai is incredible in December — warm, glamorous, and full of great experiences.”
Ask a clarifying question with dignity:
“Are you looking for something more relaxing, adventure-focused, or social?”
UI Behavior:
Rich text bubble


Quick reply chips appear:


Relaxing


Adventure


Social


Not sure



📍 FRAME 5: VAL8 Begins Collecting Context
User Input:
“Relaxing, 4 nights, with a great view.”
VAL8 Response:
“Got it. I’ll focus on ocean-view suites and peaceful stays.”
Tiny contextual chips appear inline:
4 nights


Relaxing


Ocean views


System Behavior:
Build trip context object


Trigger search API


Request rates


UI Behavior:
Loading shimmer cards appear



📍 FRAME 6: Recommendations Appear (Card Stack)
Scene:
2–5 curated, high-end options shown in cards.
Card Visual:
Edge-to-edge photo


Hotel name


Starting price


Tags:


Luxury


Ocean View


Spa


Button:


“Select”


VAL8 Voiceover (inline bubble):
“Here are a few options I curated based on what you told me.”
User Actions:
Select


Expand


“Show more like this”



📍 FRAME 7: User Modifies via Natural Language
Example Behavior:
User taps card, sees details.
User Input:
“I love this, but can we do something a bit more modern?”
VAL8 Logic:
Detect modification intent


Adjust filters


Call recommendations again


VAL8 Response:
“Absolutely — here are a few more sleek, modern properties with exceptional views.”
UI Behavior:
Old stack fades out subtly


New set animates in



📍 FRAME 8: User Selects a Recommendation
Scene:
User taps “Select” on a card.
UI:
Slide-up “Trip Plan” overlay


Summary of:


Hotel


Dates


Price


Benefits


Actions:
“Continue to Checkout”


“Explore Similar”


“Ask a Question”


Design Tone:
Simplicity


Confidence communicated through clarity



📍 FRAME 9: Checkout Screen (Minimalist)
Screen Goal:
Capture just enough to transact.
UI:
Name


Email


Phone (optional)


Legal notice link


Button:
“Confirm & Book”


Psychology:
Trust


Safety


Ease


AI Behavior:
Validate fields


Submit booking intent



📍 FRAME 10: Confirmation Screen
Moment:
Emotional payoff, reassurance.
UI:
Check icon or subtle animation


Short message:


“Your trip is confirmed.”
Subtext:
“I’ll send the itinerary to your email. Let me know if you’d like to make changes.”
Actions:
“View Itinerary”


“Make a Change”


Tone:
Calm, classy celebration


No confetti craziness



📍 FRAME 11: Post-Booking Summary Card
UI:
Destination


Dates


Hotel


Total price


Optional activities


Actions:
Modify


Cancel request


Add experiences


Concierge help


AI Behavior if needed:
“Want me to add spa, dinner reservations, or desert excursions?”

📍 FRAME 12: Exit / Save State Modal
Trigger: User closes iframe
Modal copy:
“Would you like to save your trip and access it later?”
Buttons:
Create Account


No, Thanks


Note:
Do NOT force login or friction


Business Logic:
If email collected → skip signup



📍 FRAME 13: Failure / Fallback Scenario
Example:
Supplier API returns error
VAL8 Response:
“Sorry about that — something didn’t go through correctly. Let me try again, or I can connect you to a concierge.”
Buttons:
“Retry”


“Talk to Concierge”


Goal:
Equanimity, not panic



📍 FRAME 14: Concierge Escalation (Optional)
Trigger:
Complex request


VIP cardholder


Frustration detection


UI:
Minimal modal


Copy:
“I’ll have a concierge handle this personally. They’ll message you shortly.”
Behind the Scenes:
Ticket created


Data passed to ops team



📍 FRAME 15: End State
User Journey Summary:
Intent → planning → curation → selection → booking → confirmation → aftercare → exit


System Summary:
Trip object saved


Preferences updated


Session closed



🧭 UX DESIGN PRINCIPLES IN ACTION
Luxury = simplicity + confidence


Low friction, high curation


Settings come second, story comes first


Conversation is the interface


Cards over lists, always


No cognitive overload


Completion is fast — not forced



🧱 WIDGET VARIANTS
A. Mini Widget (Sidebar)
Launch behavior:
Slide in from right


Tiny greeting


Copy:
“Where can I help you travel next?”
CTA:
“Plan Trip”


“Explore Ideas”


Best for:
Desktop partners


Persistent but unobtrusive access



B. Bottom-Nav Mobile Widget
Fab-style button:
Floating gold circle


Icon:
Star or chat bubble


Behavior:
Expands into micro-iframe


Copy:
“Ask VAL8 anything…”
Best for:
Mobile partner sites



C. Inline Widget
Placed inside content feed
Example:
“Looking for a luxury getaway? Start planning with VAL8.”
Button:
“Start”


Behavior:
Inline iframe expansion



🧰 SYSTEM BEHAVIORS (BEHIND THE SCENES)
Auto-collect intent


Detect tone


Maintain context


Rank results


Condense options


Personalize copy tone


Handle errors with grace


Move between dialog states



💡 BRAND & TONE NOTES
VAL8 is:
Confident


Calm


Smart


Helpful


NOT:
Salesy


Chatty


Robotic


Over-excited



📦 WHAT THIS STORYBOARD DELIVERS TO THE TEAM
For design:
Frames


Anatomy


Visual priorities


Interaction model


For engineering:
State transitions


System triggers


API call points


For business:
Premium product story


Demo narrative


Enterprise pitch



✨ PRV8 IFRAME USER JOURNEY
(Registered vs. Unregistered User)
Applies to iframe experience embedded into partner platforms (Visa, Saudi, Delta, etc.)

1. ENTRY FLOW
1.1 User clicks partner CTA
Examples:
“Plan with PRV8”


“Design my trip”


“AI Concierge”


Iframe opens inside partner site
Minimal loading state + brand-aligned visual.
System captures:
Partner context


Locale


Device type


Channel source



2. DECISION: REGISTERED VS. UNREGISTERED USER
When iframe loads:
2.1 Optional Login Check
System checks whether the user chooses to log in from the optional login screen.
If the user logs in → Registered Flow
 If the user skips login → Unregistered Flow
User still sees:
 “Welcome — what can I plan for you?”
No forced log-in upfront — login is optional and never blocks the experience.


3. UNREGISTERED USER FLOW
Max friction-free, “anonymous try-before-you-buy” experience.
Goal: Convert AFTER value is established.

3.1 Valet asks initial planning question
Examples:
“What are you planning?”


“Where are you headed?”


“Is this soon or flexible?”


User answers via:
Text


Voice


Quick buttons



3.2 Valet conducts lightweight onboarding via conversation
Examples:
Dates


Destination


Solo vs couple vs family


Budget tolerance


Preferences (5-star, boutique, nature, etc.)


No forms, no dropdowns, no survey UI
All conversational.

3.3 Valet recommends curated bundles
Categories:
Flights


Stays


Ground Transport


Experiences


Presented as:
Cards


Mini-itinerary


Tap to expand


Swap/Replace


Focus:
High-signal personalization


Low cognitive load



3.4 User modifies trip 
pre-checkout
Modifiable UI elements:
Flight


Hotel


Ground


Activities


Valet asks:
“What would you like to modify — dates, airline, seats, or something else?”
Edits handled within chat flow.

3.5 User completes checkout (without registering)
Checkout uses:
Supplier’s payment infra (e.g., Aspire / Ten)


Stripe / Adyen handled server-side


User receives confirmation via:
SMS link


Email link



3.6 POST-CHECKOUT OPTIONS FOR UNREGISTERED USER
User has no account, but can still:
View the booked trip


Modify or cancel before travel


Interact via chat


Entry method:
Clicks link in SMS/email → Opens iframe → Pass-through token loads itinerary.

3.7 LIMITATIONS FOR UNREGISTERED USER
User cannot:
Access chat history


Access taste graph


Access past trips


Access future trips


Access concierge escalation


See personalized recommendations history


If they request modification later:
Valet responds:
“I can help you — please provide your reservation number.”
No personalized context available.

3.8 EVENTUAL CONVERSION
When unregistered user tries to:
Modify a complex trip


Ask high-intent questions


Escalate to human concierge


Valet prompts:
“To continue, please create a secure PRV8 account so we can assist you.”
Conversion trigger:
up-sell based on value, not upfront friction

4. REGISTERED USER FLOW
Account enables persistent memory, personalization, and high-value concierge

4.1 Registration may occur at:
Before planning (voluntary)


During planning (value trigger)


After checkout (need trigger)



4.2 WHAT REGISTRATION ENABLES
Stored:
Taste graph (summarized)


Preferences


Payment profiles (future)


Loyalty numbers


Passport info (future/no PII MVP)


Trip history (future)


Enabled features:
Personalized recommendations


Re-enter previous chats


Modify bookings anytime


Escalate to concierge


Calendar integration (future)


Multi-traveler accounts (future)



4.3 REGISTERED USER PLANNING FLOW
Same conversational onboarding, but:
Valet can personalize proactively:
“Kimberly — based on your previous trip, I’ve got three great options.”


“Would you prefer Ritz or boutique?”


“Do you need business class again?”


Taste graph evolves continuously.

4.4 REGISTERED USER POST-CHECKOUT
Can re-enter chat via:
Dashboard


Partner portal


Confirmation email


SMS link


They see:
Upcoming trips


Past trips


Recommended upgrades


Suggested experiences


They can modify:
Dates


Flight class


Rooms


Ground transport


Without escalation

