import {GridLayoutProvider} from 'recyclerlistview-gridlayoutprovider';
const MAX_SPAN = 4;
export default class LayoutProvider extends GridLayoutProvider {
  constructor(props) {
    super(
      MAX_SPAN,
      (index) => {
        return props.getDataForIndex(index).type;
      },
      (index) => {
        let type = props.getDataForIndex(index).type;

        switch (type) {
          case 'TRACKS':
            return 4;

          case 'FOLDERS':
            return 4;

          case 'ALBUMS':
            return 2;
        }
      },

      (index) => {
        let type = props.getDataForIndex(index).type;

        switch (type) {
          case 'TRACKS':
            return 70;

          case 'FOLDERS':
            return 60;

          case 'ALBUMS':
            return 250;
        }
      },
    );
  }
}
