import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let workitems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((n) => {
      return {'fields': {'system.assignee': 'someUser' + n,
                         'system.creator': 'someOtherUser' + n,
                         'system.description': 'Some Description ' + n,
                         'system.state': 'new',
                         'system.title': 'Some Title ' + n},
              'id': '' + n,
              'type': 'system.userstory',
              'version': 1};
    });

    let loginStatus = {
      'status': 200,
      'responseText': 'Good Job'
    };

    let workitemtypes = [
    {
      'fields': {
        'system.assignee': {
          'required': false,
          'type': {
            'kind': 'user'
          }
        },
        'system.creator': {
          'required': true,
          'type': {
            'kind': 'user'
          }
        },
        'system.description': {
          'required': false,
          'type': {
            'kind': 'string'
          }
        },
        'system.remote_item_id': {
          'required': false,
          'type': {
            'kind': 'string'
          }
        },
        'system.state': {
          'required': true,
          'type': {
            'baseType': 'string',
            'kind': 'enum',
            'values': [
              'new',
              'open',
              'in progress',
              'resolved',
              'closed'
            ]
          }
        },
        'system.title': {
          'required': true,
          'type': {
            'kind': 'string'
          }
        }
      },
      'name': 'system.userstory',
      'version': 0
    },
    {
      'fields': {
        'system.assignee': {
          'required': false,
          'type': {
            'kind': 'user'
          }
        },
        'system.creator': {
          'required': true,
          'type': {
            'kind': 'user'
          }
        },
        'system.description': {
          'required': false,
          'type': {
            'kind': 'string'
          }
        },
        'system.remote_item_id': {
          'required': false,
          'type': {
            'kind': 'string'
          }
        },
        'system.state': {
          'required': true,
          'type': {
            'baseType': 'string',
            'kind': 'enum',
            'values': [
              'new',
              'open',
              'in progress',
              'resolved',
              'closed'
            ]
          }
        },
        'system.title': {
          'required': true,
          'type': {
            'kind': 'string'
          }
        }
      },
      'name': 'system.valueproposition',
      'version': 0
    },
    {
      'fields': {
        'system.assignee': {
          'required': false,
          'type': {
            'kind': 'user'
          }
        },
        'system.creator': {
          'required': true,
          'type': {
            'kind': 'user'
          }
        },
        'system.description': {
          'required': false,
          'type': {
            'kind': 'string'
          }
        },
        'system.remote_item_id': {
          'required': false,
          'type': {
            'kind': 'string'
          }
        },
        'system.state': {
          'required': true,
          'type': {
            'baseType': 'string',
            'kind': 'enum',
            'values': [
              'new',
              'open',
              'in progress',
              'resolved',
              'closed'
            ]
          }
        },
        'system.title': {
          'required': true,
          'type': {
            'kind': 'string'
          }
        }
      },
      'name': 'system.fundamental',
      'version': 0
    },
    {
      'fields': {
        'system.assignee': {
          'required': false,
          'type': {
            'kind': 'user'
          }
        },
        'system.creator': {
          'required': true,
          'type': {
            'kind': 'user'
          }
        },
        'system.description': {
          'required': false,
          'type': {
            'kind': 'string'
          }
        },
        'system.remote_item_id': {
          'required': false,
          'type': {
            'kind': 'string'
          }
        },
        'system.state': {
          'required': true,
          'type': {
            'baseType': 'string',
            'kind': 'enum',
            'values': [
              'new',
              'open',
              'in progress',
              'resolved',
              'closed'
            ]
          }
        },
        'system.title': {
          'required': true,
          'type': {
            'kind': 'string'
          }
        }
      },
      'name': 'system.experience',
      'version': 0
    },
    {
      'fields': {
        'system.assignee': {
          'required': false,
          'type': {
            'kind': 'user'
          }
        },
        'system.creator': {
          'required': true,
          'type': {
            'kind': 'user'
          }
        },
        'system.description': {
          'required': false,
          'type': {
            'kind': 'string'
          }
        },
        'system.remote_item_id': {
          'required': false,
          'type': {
            'kind': 'string'
          }
        },
        'system.state': {
          'required': true,
          'type': {
            'baseType': 'string',
            'kind': 'enum',
            'values': [
              'new',
              'open',
              'in progress',
              'resolved',
              'closed'
            ]
          }
        },
        'system.title': {
          'required': true,
          'type': {
            'kind': 'string'
          }
        }
      },
      'name': 'system.feature',
      'version': 0
    },
    {
      'fields': {
        'system.assignee': {
          'required': false,
          'type': {
            'kind': 'user'
          }
        },
        'system.creator': {
          'required': true,
          'type': {
            'kind': 'user'
          }
        },
        'system.description': {
          'required': false,
          'type': {
            'kind': 'string'
          }
        },
        'system.remote_item_id': {
          'required': false,
          'type': {
            'kind': 'string'
          }
        },
        'system.state': {
          'required': true,
          'type': {
            'baseType': 'string',
            'kind': 'enum',
            'values': [
              'new',
              'open',
              'in progress',
              'resolved',
              'closed'
            ]
          }
        },
        'system.title': {
          'required': true,
          'type': {
            'kind': 'string'
          }
        }
      },
      'name': 'system.bug',
      'version': 0
    }
  ];


    let user = {
      'fullName': 'Sudipta Sen',
      'imageURL': 'https://avatars.githubusercontent.com/u/2410474?v=3'
    };

    return {loginStatus, workitems, workitemtypes, user};
  }
}