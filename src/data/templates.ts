import { ContractTemplate } from '../types';

export const contractTemplates: ContractTemplate[] = [
  {
    id: 'template-employment',
    name: 'SME Employment Agreement',
    type: 'employment',
    description: 'A balanced employment contract suitable for small and medium businesses in India, covering essential terms while protecting both employer and employee interests.',
    suitableFor: ['Startups', 'Small Businesses', 'SMEs', 'New Hires'],
    content: `EMPLOYMENT AGREEMENT

This Employment Agreement ("Agreement") is made and entered into as of [DATE] ("Effective Date")

BETWEEN:

[COMPANY NAME], a company incorporated under the laws of India, having its registered office at [ADDRESS] (hereinafter referred to as the "Employer")

AND

[EMPLOYEE NAME], residing at [ADDRESS] (hereinafter referred to as the "Employee")

1. POSITION AND DUTIES
The Employee shall be employed in the position of [DESIGNATION] and shall perform duties as reasonably assigned by the Employer. The Employee shall report to [REPORTING MANAGER].

2. TERM OF EMPLOYMENT
This employment shall commence on [START DATE] and shall continue until terminated by either party in accordance with the terms of this Agreement.

3. PROBATION PERIOD
The Employee shall undergo a probation period of [3/6] months from the date of joining. During probation, either party may terminate this agreement with [15] days written notice.

4. COMPENSATION AND BENEFITS
4.1 The Employee shall receive a monthly gross salary of INR [AMOUNT].
4.2 The Employee shall be entitled to benefits as per company policy, including:
    - Provident Fund contribution as per applicable laws
    - Gratuity as per Payment of Gratuity Act
    - Health insurance coverage
    - [OTHER BENEFITS]

5. WORKING HOURS
The standard working hours shall be [X] hours per day, [Y] days per week. Flexible working arrangements may be mutually agreed upon.

6. LEAVE ENTITLEMENT
The Employee shall be entitled to:
- [X] days of paid leave per year
- [Y] days of sick leave per year
- Public holidays as per company calendar

7. CONFIDENTIALITY
The Employee agrees to maintain confidentiality of all proprietary information during and after employment. This obligation shall survive termination for a period of [2] years.

8. INTELLECTUAL PROPERTY
Any intellectual property created by the Employee during the course of employment and related to the Employer's business shall belong to the Employer.

9. TERMINATION
9.1 Either party may terminate this Agreement by providing [30/60/90] days written notice.
9.2 The Employer may terminate immediately for cause, including:
    - Gross misconduct
    - Material breach of this Agreement
    - Willful negligence

10. NOTICE PERIOD AND SEVERANCE
Upon termination, the Employee shall:
- Complete handover of all responsibilities
- Return all company property
- Be entitled to accrued but unpaid salary and leave encashment

11. NON-SOLICITATION
For a period of [12] months after termination, the Employee shall not solicit other employees to leave the Employer.

12. DISPUTE RESOLUTION
Any disputes arising from this Agreement shall be resolved through:
- First, mutual discussion and negotiation
- If unresolved, mediation
- Finally, arbitration in [CITY], India under the Arbitration and Conciliation Act, 1996

13. GOVERNING LAW
This Agreement shall be governed by the laws of India.

14. ENTIRE AGREEMENT
This Agreement constitutes the entire understanding between the parties and supersedes all prior agreements.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

EMPLOYER:
Name: _______________
Designation: _______________
Date: _______________

EMPLOYEE:
Name: _______________
Date: _______________`
  },
  {
    id: 'template-service',
    name: 'Service Agreement for SMEs',
    type: 'service',
    description: 'A comprehensive service agreement template for Indian SMEs engaging consultants, contractors, or service providers.',
    suitableFor: ['Consulting Services', 'IT Services', 'Professional Services', 'Contractors'],
    content: `SERVICE AGREEMENT

This Service Agreement ("Agreement") is entered into as of [DATE]

BETWEEN:

[CLIENT COMPANY NAME], having its office at [ADDRESS] (hereinafter referred to as the "Client")

AND

[SERVICE PROVIDER NAME], having its office at [ADDRESS] (hereinafter referred to as the "Service Provider")

1. SCOPE OF SERVICES
1.1 The Service Provider agrees to provide the following services:
    [DETAILED DESCRIPTION OF SERVICES]
1.2 Deliverables:
    - [DELIVERABLE 1]
    - [DELIVERABLE 2]
    - [DELIVERABLE 3]

2. TERM
This Agreement shall commence on [START DATE] and continue until [END DATE], unless terminated earlier in accordance with this Agreement.

3. FEES AND PAYMENT
3.1 The Client shall pay the Service Provider:
    - Fixed Fee: INR [AMOUNT], OR
    - Hourly Rate: INR [AMOUNT] per hour
3.2 Payment Terms: Payment shall be made within [30] days of receipt of invoice.
3.3 GST: All fees are exclusive of GST, which shall be charged as applicable.
3.4 Expenses: Pre-approved expenses shall be reimbursed at actual cost.

4. PERFORMANCE STANDARDS
4.1 The Service Provider shall perform services with professional skill and care.
4.2 The Service Provider shall meet the following milestones:
    - [MILESTONE 1]: [DATE]
    - [MILESTONE 2]: [DATE]

5. CLIENT OBLIGATIONS
The Client shall:
- Provide timely access to required information and personnel
- Make payments as per agreed schedule
- Provide feedback within reasonable timeframes

6. CONFIDENTIALITY
Both parties agree to maintain confidentiality of proprietary information exchanged during the course of this Agreement. This obligation shall survive termination for [3] years.

7. INTELLECTUAL PROPERTY
7.1 Pre-existing IP shall remain with the original owner.
7.2 Work Product: All deliverables created under this Agreement shall belong to the Client upon full payment.
7.3 The Service Provider retains the right to use general skills, knowledge, and experience gained.

8. WARRANTIES
8.1 The Service Provider warrants that:
    - Services shall be performed in a professional manner
    - Deliverables shall conform to agreed specifications
8.2 Warranty Period: [90] days from delivery

9. LIMITATION OF LIABILITY
9.1 Neither party shall be liable for indirect, incidental, or consequential damages.
9.2 Total liability shall be limited to the fees paid under this Agreement.

10. INDEMNIFICATION
Each party shall indemnify the other against claims arising from:
- Breach of this Agreement
- Negligence or willful misconduct
- Infringement of third-party rights

11. TERMINATION
11.1 Either party may terminate with [30] days written notice.
11.2 Either party may terminate immediately for material breach not cured within [15] days of notice.
11.3 Upon termination:
    - Client shall pay for services rendered
    - Service Provider shall deliver completed work

12. FORCE MAJEURE
Neither party shall be liable for delays caused by circumstances beyond reasonable control.

13. DISPUTE RESOLUTION
Disputes shall be resolved through:
- Negotiation between senior representatives
- Mediation, if negotiation fails
- Arbitration in [CITY], India

14. GOVERNING LAW
This Agreement shall be governed by the laws of India.

15. GENERAL PROVISIONS
15.1 This Agreement may not be assigned without written consent.
15.2 Amendments must be in writing and signed by both parties.
15.3 This constitutes the entire agreement between the parties.

SIGNATURES:

CLIENT:
Name: _______________
Title: _______________
Date: _______________

SERVICE PROVIDER:
Name: _______________
Title: _______________
Date: _______________`
  },
  {
    id: 'template-nda',
    name: 'Non-Disclosure Agreement (NDA)',
    type: 'nda',
    description: 'A mutual NDA suitable for business discussions, partnerships, or vendor evaluations.',
    suitableFor: ['Business Discussions', 'Vendor Evaluation', 'Partnerships', 'Investor Meetings'],
    content: `MUTUAL NON-DISCLOSURE AGREEMENT

This Mutual Non-Disclosure Agreement ("Agreement") is entered into as of [DATE]

BETWEEN:

[PARTY A NAME], having its office at [ADDRESS] ("Party A")

AND

[PARTY B NAME], having its office at [ADDRESS] ("Party B")

(Collectively referred to as "Parties" and individually as "Party")

WHEREAS, the Parties wish to explore a potential business relationship and may need to disclose certain confidential information to each other.

NOW, THEREFORE, the Parties agree as follows:

1. DEFINITION OF CONFIDENTIAL INFORMATION
"Confidential Information" means any non-public information disclosed by either Party, including but not limited to:
- Business plans and strategies
- Financial information
- Technical data and know-how
- Customer and supplier lists
- Product and service information
- Trade secrets

2. EXCLUSIONS
Confidential Information does not include information that:
- Is or becomes publicly available through no fault of the receiving party
- Was rightfully in the receiving party's possession prior to disclosure
- Is independently developed without use of Confidential Information
- Is rightfully obtained from a third party without restriction

3. OBLIGATIONS
Each Party receiving Confidential Information shall:
- Use it only for evaluating the potential business relationship
- Maintain it in confidence with the same degree of care as its own confidential information
- Not disclose it to third parties without prior written consent
- Limit access to employees with a need to know

4. PERMITTED DISCLOSURES
Confidential Information may be disclosed:
- To professional advisors bound by confidentiality
- As required by law or court order, with prior notice to the disclosing party

5. TERM
5.1 This Agreement shall remain in effect for [2] years from the Effective Date.
5.2 Confidentiality obligations shall survive termination for [3] years.

6. RETURN OF INFORMATION
Upon request or termination, each Party shall:
- Return or destroy all Confidential Information
- Provide written confirmation of destruction

7. NO LICENSE
No license to any intellectual property is granted by this Agreement.

8. NO OBLIGATION
This Agreement does not obligate either Party to:
- Enter into any business relationship
- Disclose any particular information
- Purchase any products or services

9. REMEDIES
Both Parties acknowledge that breach may cause irreparable harm and that monetary damages may be inadequate. The disclosing Party shall be entitled to seek injunctive relief.

10. GOVERNING LAW AND JURISDICTION
This Agreement shall be governed by the laws of India. Disputes shall be subject to the exclusive jurisdiction of courts in [CITY].

11. GENERAL
11.1 This Agreement may not be assigned without written consent.
11.2 This constitutes the entire agreement regarding confidentiality.
11.3 Amendments must be in writing and signed by both Parties.

IN WITNESS WHEREOF, the Parties have executed this Agreement.

PARTY A:
Name: _______________
Title: _______________
Date: _______________

PARTY B:
Name: _______________
Title: _______________
Date: _______________`
  },
  {
    id: 'template-vendor',
    name: 'Vendor/Supplier Agreement',
    type: 'vendor',
    description: 'A vendor agreement template for SMEs to engage suppliers for goods or materials.',
    suitableFor: ['Raw Material Suppliers', 'Product Vendors', 'Manufacturing', 'Retail'],
    content: `VENDOR AGREEMENT

This Vendor Agreement ("Agreement") is entered into as of [DATE]

BETWEEN:

[BUYER COMPANY NAME], having its office at [ADDRESS] (hereinafter referred to as the "Buyer")

AND

[VENDOR NAME], having its office at [ADDRESS] (hereinafter referred to as the "Vendor")

1. PRODUCTS/SERVICES
The Vendor agrees to supply the following products/services:
- [PRODUCT/SERVICE 1]
- [PRODUCT/SERVICE 2]
- [PRODUCT/SERVICE 3]

2. ORDERING AND DELIVERY
2.1 Orders shall be placed via [purchase order/email/portal].
2.2 Delivery shall be made within [X] days of order confirmation.
2.3 Delivery Location: [ADDRESS]
2.4 Risk of loss passes upon delivery.

3. PRICING AND PAYMENT
3.1 Prices shall be as per the attached price schedule.
3.2 Prices are inclusive/exclusive of GST.
3.3 Payment Terms: [30/45/60] days from date of invoice.
3.4 Late payment shall attract interest at [X]% per annum.

4. QUALITY STANDARDS
4.1 All products shall meet the specifications agreed upon.
4.2 The Vendor shall maintain quality certifications as required.
4.3 The Buyer may reject non-conforming products within [X] days.

5. WARRANTIES
The Vendor warrants that:
- Products are free from defects
- Products conform to specifications
- Products do not infringe third-party rights
Warranty Period: [12] months from delivery.

6. INSPECTION AND ACCEPTANCE
6.1 The Buyer may inspect products upon delivery.
6.2 Acceptance does not waive warranty rights.
6.3 Defective products shall be replaced at Vendor's expense.

7. CONFIDENTIALITY
Both parties shall maintain confidentiality of pricing, business information, and other proprietary data.

8. INDEMNIFICATION
The Vendor shall indemnify the Buyer against:
- Product defects
- Intellectual property infringement
- Negligence or misconduct

9. LIMITATION OF LIABILITY
9.1 Neither party liable for indirect or consequential damages.
9.2 Vendor's liability limited to value of defective products.

10. TERMINATION
10.1 Either party may terminate with [30] days written notice.
10.2 Immediate termination for material breach.
10.3 Outstanding orders shall be fulfilled or cancelled by mutual agreement.

11. FORCE MAJEURE
Neither party liable for delays due to circumstances beyond reasonable control.

12. DISPUTE RESOLUTION
Disputes shall be resolved through negotiation, failing which arbitration in [CITY], India.

13. GOVERNING LAW
This Agreement shall be governed by the laws of India.

SIGNATURES:

BUYER:
Name: _______________
Title: _______________
Date: _______________

VENDOR:
Name: _______________
Title: _______________
Date: _______________`
  },
  {
    id: 'template-lease',
    name: 'Commercial Lease Agreement',
    type: 'lease',
    description: 'A commercial lease agreement template for SMEs renting office or commercial space.',
    suitableFor: ['Office Space', 'Retail Space', 'Warehouse', 'Commercial Premises'],
    content: `COMMERCIAL LEASE AGREEMENT

This Lease Agreement ("Agreement") is made on [DATE]

BETWEEN:

[LANDLORD NAME], having address at [ADDRESS] (hereinafter referred to as the "Landlord")

AND

[TENANT COMPANY NAME], having its registered office at [ADDRESS] (hereinafter referred to as the "Tenant")

1. PREMISES
The Landlord agrees to lease to the Tenant the following premises:
Address: [FULL ADDRESS]
Area: [X] square feet
Description: [DESCRIPTION OF PREMISES]

2. TERM
2.1 Initial Term: [X] years, commencing from [START DATE] to [END DATE].
2.2 Renewal: The Tenant may renew for additional [X] year terms with [3] months advance notice.

3. RENT
3.1 Monthly Rent: INR [AMOUNT] per month
3.2 Due Date: Rent is due on or before the [X]th of each month.
3.3 Escalation: Rent shall increase by [X]% annually.
3.4 Payment Method: [Bank Transfer/Cheque]

4. SECURITY DEPOSIT
4.1 Amount: INR [AMOUNT] (equivalent to [X] months rent)
4.2 The deposit shall be refunded within [30] days of termination, less any deductions for damages or unpaid rent.

5. PERMITTED USE
The premises shall be used solely for [PERMITTED BUSINESS ACTIVITY] and for no other purpose without the Landlord's written consent.

6. MAINTENANCE AND REPAIRS
6.1 Tenant Responsibility: Day-to-day maintenance and minor repairs.
6.2 Landlord Responsibility: Structural repairs and major systems (plumbing, electrical).
6.3 The Tenant shall maintain the premises in good condition.

7. UTILITIES
The Tenant shall pay for all utilities including electricity, water, internet, and telephone.

8. ALTERATIONS
The Tenant shall not make structural alterations without the Landlord's prior written consent. Minor modifications for business needs may be permitted.

9. INSURANCE
9.1 The Tenant shall maintain adequate insurance for business operations and contents.
9.2 The Landlord shall insure the building structure.

10. SUBLETTING
The Tenant shall not sublet or assign the lease without the Landlord's written consent.

11. ACCESS
The Landlord may access the premises with [24] hours notice for inspections, repairs, or showing to prospective tenants.

12. TERMINATION
12.1 Either party may terminate with [3] months written notice.
12.2 The Landlord may terminate immediately for:
    - Non-payment of rent for [X] consecutive months
    - Material breach of this Agreement
    - Illegal activities on premises

13. END OF LEASE
Upon termination, the Tenant shall:
- Vacate the premises
- Remove all belongings
- Return keys and access cards
- Leave premises in good condition, normal wear excepted

14. REGISTRATION
This Agreement shall be registered as per the Registration Act, 1908. Stamp duty and registration charges shall be borne [equally/by Tenant].

15. DISPUTE RESOLUTION
Disputes shall be resolved through arbitration in [CITY], India.

16. GOVERNING LAW
This Agreement shall be governed by the laws of India and the state of [STATE].

SIGNATURES:

LANDLORD:
Name: _______________
Date: _______________

TENANT:
Name: _______________
Title: _______________
Date: _______________

WITNESSES:
1. Name: _______________
2. Name: _______________`
  },
  {
    id: 'template-partnership',
    name: 'Partnership Deed',
    type: 'partnership',
    description: 'A partnership deed template for small business partnerships in India.',
    suitableFor: ['New Partnerships', 'Small Businesses', 'Professional Partnerships', 'Family Businesses'],
    content: `PARTNERSHIP DEED

This Partnership Deed is made on [DATE]

BETWEEN:

1. [PARTNER 1 NAME], residing at [ADDRESS] ("First Partner")
2. [PARTNER 2 NAME], residing at [ADDRESS] ("Second Partner")
3. [PARTNER 3 NAME], residing at [ADDRESS] ("Third Partner")

(Collectively referred to as "Partners")

WHEREAS the Partners desire to form a partnership firm for carrying on business, they hereby agree as follows:

1. NAME OF FIRM
The partnership shall be carried on under the name and style of "[FIRM NAME]"

2. NATURE OF BUSINESS
The business of the partnership shall be [DESCRIPTION OF BUSINESS ACTIVITIES].

3. PLACE OF BUSINESS
The principal place of business shall be at [ADDRESS]. Branch offices may be opened by mutual consent.

4. COMMENCEMENT AND DURATION
4.1 The partnership shall commence from [DATE].
4.2 The partnership shall continue until dissolved by mutual consent or as per this Deed.

5. CAPITAL CONTRIBUTION
The Partners shall contribute capital as follows:
- First Partner: INR [AMOUNT]
- Second Partner: INR [AMOUNT]
- Third Partner: INR [AMOUNT]
Total Capital: INR [TOTAL]

6. PROFIT AND LOSS SHARING
Profits and losses shall be shared in the following ratio:
- First Partner: [X]%
- Second Partner: [Y]%
- Third Partner: [Z]%

7. DRAWINGS
7.1 Partners may draw up to INR [AMOUNT] per month.
7.2 Additional drawings require consent of all Partners.
7.3 Interest on excess drawings: [X]% per annum.

8. INTEREST ON CAPITAL
Partners shall receive interest on capital at [X]% per annum before distribution of profits.

9. MANAGEMENT AND DUTIES
9.1 All Partners shall devote their full time and attention to the business.
9.2 Day-to-day decisions may be taken by any Partner.
9.3 Major decisions require unanimous consent:
    - Borrowing above INR [AMOUNT]
    - Acquisition or sale of assets above INR [AMOUNT]
    - Admission of new Partners
    - Amendment to this Deed

10. BANKING
10.1 Bank accounts shall be in the firm's name.
10.2 Cheques may be signed by [AUTHORIZED SIGNATORIES].
10.3 Withdrawals above INR [AMOUNT] require two signatures.

11. ACCOUNTS AND AUDIT
11.1 Proper books of accounts shall be maintained.
11.2 Accounts shall be audited annually.
11.3 Each Partner has the right to inspect books at any time.

12. RETIREMENT
12.1 A Partner may retire with [6] months written notice.
12.2 Retiring Partner's share shall be settled within [12] months.

13. DEATH OF A PARTNER
13.1 Upon death, the partnership shall not dissolve.
13.2 The deceased Partner's share shall be paid to legal heirs.
13.3 Legal heirs shall not become Partners automatically.

14. ADMISSION OF NEW PARTNER
New Partners may be admitted only with unanimous consent of existing Partners.

15. EXPULSION
A Partner may be expelled for:
- Gross misconduct
- Breach of this Deed
- Conviction of criminal offense
- Actions prejudicial to the firm

16. DISSOLUTION
The partnership may be dissolved by:
- Mutual agreement of all Partners
- Court order
- Notice by any Partner (with [6] months notice)

17. SETTLEMENT UPON DISSOLUTION
Upon dissolution:
- Assets shall be realized
- Debts shall be paid
- Surplus shall be distributed as per profit-sharing ratio

18. NON-COMPETE
During partnership and for [2] years after exit, Partners shall not engage in competing business.

19. DISPUTE RESOLUTION
Disputes shall be resolved through arbitration in [CITY], India.

20. GOVERNING LAW
This Deed shall be governed by the Indian Partnership Act, 1932.

21. REGISTRATION
This Deed shall be registered with the Registrar of Firms.

IN WITNESS WHEREOF, the Partners have signed this Deed.

SIGNATURES:

First Partner: _______________ Date: _______________

Second Partner: _______________ Date: _______________

Third Partner: _______________ Date: _______________

WITNESSES:
1. Name: _______________ Signature: _______________
2. Name: _______________ Signature: _______________`
  }
];
