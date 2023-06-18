import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { Asset } from '../../types/AssetType';

const statusItemTemplate = (option: number) => {
    return <Tag value={option} />;
};

const isSoftwareBodyTemplate = (asset: Asset) => {
    return (
        <i
            className={classNames('pi', {
                'true-icon pi-check-circle': asset.isSoftware,
                'false-icon pi-times-circle': !asset.isSoftware,
            })}
        ></i>
    );
};

export { statusItemTemplate, isSoftwareBodyTemplate };
