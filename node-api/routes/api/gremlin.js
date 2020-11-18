const express = require('express');
const gremlin = require('gremlin');
const router = express.Router();

const client = new gremlin.driver.Client('ws://gremlin-server:8182/gremlin', { traversalSource: 'g' });

const subgroups = {
  vimDeviceVirtualE1000e:{
    identifier: 'vim.vm.device.VirtualE1000e',
  },
  vimDeviceVirtualLsiLogicSASController:{
    identifier: 'vim.vm.device.VirtualLsiLogicSASController',
  },
  vimDeviceVirtualE1000:{
    identifier: 'vim.vm.device.VirtualE1000',
  },
  vimDeviceVirtualLsiLogicController:{
    identifier: 'vim.vm.device.VirtualLsiLogicController',
  },
  vimDeviceVirtualAHCIController:{
    identifier: 'vim.vm.device.VirtualAHCIController',
  },
  vimDeviceParaVirtualSCSIController:{
    identifier: 'vim.vm.device.ParaVirtualSCSIController',
  },
  vimDeviceVirtualVmxnet3:{
    identifier: 'vim.vm.device.VirtualVmxnet3',
  },
  vimDeviceVirtualDisk:{
    identifier: 'vim.vm.device.VirtualDisk',
  },
  vimHostBlockHba:{
    identifier: 'vim.host.BlockHba',
  },
  vimHostSerialAttachedHba:{
    identifier: 'vim.host.SerialAttachedHba',
  },
  vimHostFibreChannelHba:{
    identifier: 'vim.host.FibreChannelHba',
  },
  vimHostPhysicalNic:{
    identifier: 'vim.host.PhysicalNic',
  },
  vimHostSystem:{
    identifier: 'vim.HostSystem',
  },
  VirtualMachine:{
    identifier: 'vim.VirtualMachine',
  },
  Datastore:{
    identifier: 'vim.Datastore',
  }
};

// @route    GET api/gremlin
// @desc     Get count of all
// @access   Public
router.get('/', [], async (req, res) => {
  try {
    const query = async () => await client.submit('g.V().count()');
    await query().then(result => {
      res.json(result);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/gremlin/data
// @desc     Get count of all
// @access   Public
router.get('/data', [], async (req, res) => {
  try {
    const query = async () => await client.submit('g.V()');
    // const clientSubmit = async () => await client.submit('g.V().hasLabel(var)', { var: 'vim_object' });
    // const clientSubmit = async () => await client.submit('g.V().groupCount().by(label)');
    await query().then(result => {
      res.json(result);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/gremlin/data
// @desc     Get immediate edges by id
// @access   Public
router.get('/getE/:id', [], async (req, res) => {
  const id = req.params.id
  try {
    const query = async () => await client.submit(
      "g.V('"+id+"').bothE()"
      );
    await query().then(result => {
      res.json(result);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/gremlin/TreeRoot
// @desc     Get Tree view main
// @access   Public
router.get('/get/TreeRoot', [], async (req, res) => {
  const tree = [
      [{Vim_Devices: {
        children: [
          {
            title: 'vim.vm.device.VirtualE1000e',
            url: 'getby/vimDeviceVirtualE1000e'
          },
          {
            title: 'vim.vm.device.VirtualLsiLogicSASController',
            url: 'getby/vimDeviceVirtualLsiLogicSASController'
          },
          {
            title: 'vim.vm.device.VirtualE1000',
            url: 'getby/vimDeviceVirtualE1000'
          },
          {
            title: 'vim.vm.device.VirtualLsiLogicController',
            url: 'getby/vimDeviceVirtualLsiLogicController'
          },
          {
            title: 'vim.vm.device.VirtualAHCIController',
            url: 'getby/vimDeviceVirtualAHCIController'
          },
          {
            title: 'vim.vm.device.ParaVirtualSCSIController',
            url: 'getby/vimDeviceParaVirtualSCSIController'
          },
          {
            title: 'vim.vm.device.VirtualVmxnet3',
            url: 'getby/vimDeviceVirtualVmxnet3'
          },
          {
            title: 'vim.vm.device.VirtualDisk',
            url: 'getby/vimDeviceVirtualDisk'
          }
        ]
      }}],
      [{Vim_Hosts: {
        children: [
          {
            title: 'vim.host.BlockHba',
            url: 'getby/vimHostBlockHba'
          },
          {
            title: 'vim.host.SerialAttachedHba',
            url: 'getby/vimHostSerialAttachedHba'
          },
          {
            title: 'vim.host.FibreChannelHba',
            url: 'getby/vimHostFibreChannelHba'
          },
          {
            title: 'vim.host.PhysicalNic',
            url: 'getby/vimHostPhysicalNic'
          }
        ]
      }}],
      [{Vim_Host_Sytems: {
        title: 'Vim_Host_Sytems',
        url: 'getby/vimHostSystem'
      }}],
      [{Virtual_Machines: {
        title: 'Virtual_Machines',
        url: 'getby/VirtualMachine'
      }}],
      [{Datastores: {
        title: 'Datastores',
        url: 'getby/Datastore'
      }}],
      [{uncategorised: {
        title: 'uncategorised',
        url: 'get/uncategorised'
      }}]
    ];
  try {
    res.json(tree);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/gremlin/getby
// @desc     Get by type 
// @access   Public
router.get('/getby/:type', [], async (req, res) => {
  const type = req.params.type
  try {
    // check for type
    if(!(type in subgroups)) {
      res.json({ error: 'invalid type' })
    } else {
      const query = async () => await client.submit(
        "g.V().has('_vimtype', eq('"+subgroups[type].identifier+"'))"
      );
      await query().then(result => {
        res.json(result);
      });
    };
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/gremlin/subgraph/:type
// @desc     Get by type the surrounding vertices and connect 1 vertice out
// @access   Public
router.get('/subgraph/:type', [], async (req, res) => {
  const type = req.params.type
  try {
    // check for type
    if(!(type in subgroups)) {
      res.json({ error: 'invalid type' })
    } else {
      const query = async () => await client.submit(
        "g.V().has('_vimtype', eq('"+subgroups[type].identifier+"'))\
        .bothE('connection')\
        .subgraph('v')\
        .bothV()\
        .outE('connection')\
        .where(inV().has('_vimtype', eq('"+subgroups[type].identifier+"'))).dedup()\
        .subgraph('v')\
        .cap('v').next()",
      );
      await query().then(result => {
        res.json(result);
      });
    };
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/gremlin/get/uncategorised
// @desc     Get vertices lacking '_vimtype'
// @access   Public
router.get('/get/uncategorised', [], async (req, res) => {
  const filter = {
    property: '_vimtype'
  };
  try {
    const query = async () => await client.submit(
      "g.V().hasNot('" + filter.property + "')"
    );
    await query().then(result => {
      res.json(result);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
