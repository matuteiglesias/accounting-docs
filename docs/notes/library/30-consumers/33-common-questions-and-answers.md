---
title: "Common Questions and Answers"
sidebar_label: "Q&A"
sidebar_position: 33
description: "Answers common questions about governed accounting reports, freshness, cash, debt, funding, annualization, and interpretation boundaries."
doc_type: "faq"
---

# Common Questions and Answers

Status: current consumer FAQ  
Last reviewed: 2026-08-25  
Accounting truth checked: `accounting-workflows@b7d2c3a379f966f4d69b56c2df113714a7051452`  
Viewer boundary checked: `accounting-viewer@9d2dfabe3227195f7910ae362bcaaedd6c509529`

## Where do I find the latest accounting output?

There is no single universal report file. Start with the scope-qualified governed publication manifest:

```text
public/accounting/latest_<SCOPE_TAG>/manifest.json
```

Verify scope, source run, reporting cutoff/as-of evidence, status and published file classes. If you need a human-readable table with supporting membership, use the professional pack/linked drilldowns for that same run and scope.

The private viewer is a separate packaged review surface; a working viewer route does not prove that it contains the current governed publication.

## Where do I check rent?

Use the governed rent identity (`IS.RENT.TOTAL`) and its operating-revenue/rent semantic membership, or the corresponding professional rent cell/drilldown.

Do not use retired `metric_views/rent_rollup_*` paths as current authority.

## What counts as property OPEX?

The current semantic authority classifies governed property expenses such as taxes, services, maintenance and legal costs into `property_opex`.

Household/personal expenses, family withdrawals/distributions, funding, debt movements, internal transfers, treasury FX and unknown/review-required rows are separate populations. They must not be swept into property OPEX to make totals convenient.

## Is funding operating revenue?

No. Core funding is the `funding_contribution` semantic population and remains separate from operating revenue.

Some annual/professional tables use a broader typed support contract. That contract distinguishes:

- `core_contribution`;
- `direct_obligation_payment`;
- `debt_linked_support`.

A broader support member does not automatically become core funding.

## Are personal draws or distributions property expenses?

No. Withdrawal/distribution-like outflows remain separate from property OPEX.

Their accounting classification also does not establish legal entitlement, ownership share, reimbursement rights, breach, or family fairness. Those require separate documentary/legal analysis.

## What number should I use for cash?

Only the governed validated-cash population from `monthly_cash_close.csv` through the validated-cash selection authority.

Inferred Box-control balances and internal party balances are excluded and are never fallback cash. If the validated source or required identity is unavailable, report the value as unavailable/unsupported rather than substituting another balance.

## Which debt table tells me how much is owed?

For report-safe debt stock, use `monthly_debt_position.csv` and its governed professional debt-position projection. Raw open-item and repayment files are debt-engine evidence, not the canonical headline stock contract.

For movements during a period, use `monthly_debt_activity.csv`.

Debt position is a **stock**; debt activity is a **flow**. Accounting debt evidence does not by itself establish legal enforceability.

## How are annual numbers built?

Additive annual flows consume governed `annual_flow_membership.csv` lineage. The professional layer does not rescan monthly rows and invent annual membership.

Closing stocks are different:

- annual validated cash selects the latest period with valid candidates and applies the same validated-account snapshot primitive;
- annual debt stock selects the latest governed period and latest valid as-of observation inside that period.

Monthly stock values are never summed into an annual stock.

## Can I add ARS and USD?

Not silently. Governed money rows require explicit native `Currency`. Missing currency is a fail-closed condition for governed professional flow/debt/FX execution.

A cross-currency total requires a separate explicit governed conversion contract; it is not implied by presentation convenience.

## What happens to unknown or review-required rows?

They stay visible as unknown/review-required until upstream accounting authority resolves them. They are not forced into OPEX, funding, draws or another category to complete a report.

## How do FX drilldowns work?

A governed FX row must resolve:

1. an explicit recognized measure: `amount_in`, `amount_out`, `net_amount`, or `amount_abs`;
2. explicit native `Currency`;
3. either currency-total grain or Box × Currency grain;
4. compatible semantic/producer metadata.

Ambiguous measure, missing currency, missing required Box, or conflicting metadata is unsupported. The drilldown must not silently default to `net_amount` or widen the grain.

## How do I know whether a professional cell reconciles?

Open its governed drilldown. Check:

- table/cell identity;
- period/year and native currency;
- required dimensions;
- executor/contract and source artifact;
- matched members;
- displayed value versus matched value;
- residual and status;
- caveat or unsupported reason.

`residual_warning`, `unsupported`, `unavailable`, `empty`, or missing-source states are signals to investigate, not permissions to change membership in the report layer.

## How do I know exactly what the publisher released?

Read the scope-qualified `manifest.json`, then `artifact_contracts.csv` and `publish_contract_qa.csv`.

The public bundle separates:

- `public_contract`;
- `canonical_dashboard`;
- `internal_diagnostic`;
- `unsafe_for_frontend`.

Presence in the bundle is not the same thing as suitability for headline display.

## Can I trust the viewer if the page loads?

A successful viewer import, HTTP response or deployment proves only that the viewer can serve its packaged snapshot.

The current viewer loader still hardcodes older package roots (`accounting_surface/data/` and `public/accounting/latest/`) while the current backend publisher uses scope-qualified bundles. Verify the viewer manifest/run/cutoff independently until that integration boundary is reconciled.

## What should I do if an expected current file or report is missing?

Do not jump to historical `build-all`, retired report targets, or an assumed systemd service.

First establish whether the missing thing is supposed to exist in the current contract:

1. check the scope-qualified publication manifest and file class;
2. identify the source run/scope/cutoff;
3. check the current [accounting spine runbook](/notes/accounting_spine_runbook) and [canonical commands](/notes/canonical_commands);
4. inspect relevant QA/release evidence;
5. if the artifact should exist upstream, repair/re-run the narrow governed producer rather than fabricating it in the viewer or docs.

Scheduler/deployment investigation belongs to the automation/recovery guidance and should not be inferred from an old unit name.

## Do these accounting classifications prove legal or family rights?

No. They establish how the accounting system records and reports facts under its governed classifications. Ownership, inheritance, enforceability, administrator obligations, reimbursement rights, remedies, negotiation positions and family-governance conclusions require separate documentary/legal analysis.
