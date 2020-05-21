import { Injectable } from '@angular/core';
import { ITfc } from './tfc.interface';
import { CIQ } from 'chartiq/js/chartiq';

@Injectable()
export class TfcService extends ITfc {
	available() {
		return true;
	}

	loadPlugin({ stx, context }) {
		return Promise.all([
			// @ts-ignore /* prevent compile failure when tfc plugin is not available as part of library */
			import('chartiq/plugins/tfc/tfc-loader'),
			// @ts-ignore /* prevent compile failure when tfc plugin is not available as part of library */
			import('chartiq/plugins/tfc/tfc-demo'),
			import('chartiq/js/components'),
		]).then(
			([
				{
					CIQ: { TFC, Account },
				},
			]) => {
				CIQ.UI.ensureComponentsRegistered();
				new TFC({
					stx,
					context,
					account: Account.Demo,
				});
			}
		);
	}

	openPanel(contextContainer, value) {
		const tradePanel = contextContainer.querySelector('.stx-trade-panel');
		const tfcContainer = contextContainer.querySelector('cq-side-panel');

		if (!tradePanel) {
			tfcContainer.style.width = value ? '280px' : '0';
			return;
		}

		tradePanel.classList[value ? 'add' : 'remove']('active');
		tradePanel.classList[!value ? 'add' : 'remove']('closed');
		tfcContainer['resizeMyself']();
		if (value) {
			tradePanel.setAttribute('cq-active', '');
		} else {
			tradePanel.removeAttribute('cq-active');
		}
	}
}
